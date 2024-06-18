import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getMesasDisponibles } from '../../../api/ApiClases';
import { postAgendarReservaDelClub } from '../../../api/ApiReservas';
import { formatearFechaTipoDate } from '../../../helpers/fechas';
import AgendarReservaClubDto from '../../../models/dtos/reservas/AgendarReserva.dto.model';
import { MesasDisponible } from '../../../models/responses/clases/MesasDisponibles.response';

interface ReservaFormProps {
    initialValues: AgendarReservaClubDto;
    onSubmit: () => void;
    onClose: () => void;
}

const validationSchema = Yup.object({
    horaDesde: Yup.string().required('Required'),
    horaHasta: Yup.string().required('Required'),
    idMesa: Yup.number().required('Required'),
});

const ReservasForm: React.FC<ReservaFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const [mesas, setMesas] = useState<MesasDisponible[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchMesas = async () => {
            const data = await getMesasDisponibles();
            if (data && data.mesasDisponibles) {
                setMesas(data.mesasDisponibles);
            }
        };
        fetchMesas();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const reservaToSubmit = {
                        ...values,
                        fechaAgendamiento: formatearFechaTipoDate(new Date()), // Establecer la fecha actual
                    };
                    await postAgendarReservaDelClub(reservaToSubmit); // Asegúrate de tener esta función definida
                    setSnackbarOpen(true);
                    onSubmit(); // Recargar eventos
                    onClose(); // Cerrar modal
                } catch (error) {
                    console.error('There was an error creating the reservation!', error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6">Formulario de Reserva</Typography>

                        <Field name="horaDesde" as={TextField} label="Hora Desde" type="datetime-local" InputLabelProps={{ shrink: true }} />
                        <ErrorMessage name="horaDesde" component="div" />

                        <Field name="horaHasta" as={TextField} label="Hora Hasta" type="datetime-local" InputLabelProps={{ shrink: true }} />
                        <ErrorMessage name="horaHasta" component="div" />

                        <FormControl fullWidth>
                            <InputLabel id="mesa-label">Mesa</InputLabel>
                            <Field name="idMesa" as={Select} labelId="mesa-label" label="Mesa">
                                {mesas.map(mesa => (
                                    <MenuItem key={mesa.idMesa} value={mesa.idMesa}>
                                        {mesa.descMesa}
                                    </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage name="idMesa" component="div" />
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Crear
                        </Button>
                    </Box>

                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Reserva creada exitosamente!
                        </Alert>
                    </Snackbar>
                </Form>
            )}
        </Formik>
    );
};

export default ReservasForm;
