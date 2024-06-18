import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import * as Yup from 'yup';
import { getTipoEventos, postCrearEventoClub } from '../../../api/ApiEventos';
import CrearEventoDto from '../../../models/dtos/eventos/CrearEventoDto.model';

interface EventFormProps {
    initialValues: CrearEventoDto;
    onSubmit: (values: CrearEventoDto) => void;
    onClose: () => void;
}

interface TipoEvento {
    idTipoEvento: number;
    descTipoEvento: string;
}

const validationSchema = Yup.object({
    tipoEvento: Yup.number().required('Required'),
    nombreEvento: Yup.string().required('Required'),
    descripcion: Yup.string().required('Required'),
    horaDesde: Yup.string().required('Required'),
    horaHasta: Yup.string().required('Required'),
    todoElDia: Yup.string().required('Required'),
    costoEvento: Yup.number().required('Required').positive('Must be positive'),
});

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const [tipoEventos, setTipoEventos] = useState<TipoEvento[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        // Cargar los tipos de eventos al montar el componente
        const fetchTipoEventos = async () => {
            const data = await getTipoEventos();
            if (data && data.tiposEventos) {
                setTipoEventos(data.tiposEventos);
            }
        };
        fetchTipoEventos();
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
                    const eventToSubmit = {
                        ...values,
                        fechaAgendamiento: new Date().toISOString().substring(0, 10), // Establecer la fecha actual
                        costoEvento: Number(values.costoEvento.toString().replace(/[^0-9.-]+/g, "")), // Convertir el costo a número
                    };
                    await postCrearEventoClub(eventToSubmit);
                    setSnackbarOpen(true);
                    onSubmit(eventToSubmit); // Recargar eventos
                    onClose(); // Cerrar modal
                } catch (error) {
                    console.error('There was an error creating the event!', error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6">Formulario de Evento</Typography>

                        <FormControl fullWidth>
                            <InputLabel id="tipo-evento-label">Tipo de Evento</InputLabel>
                            <Field name="tipoEvento" as={Select} labelId="tipo-evento-label" label="Tipo de Evento">
                                {tipoEventos.map(tipo => (
                                    <MenuItem key={tipo.idTipoEvento} value={tipo.idTipoEvento}>
                                        {tipo.descTipoEvento}
                                    </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage name="tipoEvento" component="div" />
                        </FormControl>

                        <Field name="nombreEvento" as={TextField} label="Nombre del Evento" />
                        <ErrorMessage name="nombreEvento" component="div" />

                        <Field name="descripcion" as={TextField} label="Descripción" />
                        <ErrorMessage name="descripcion" component="div" />

                        <Field name="horaDesde" as={TextField} label="Hora Desde" type="datetime-local" InputLabelProps={{ shrink: true }} />
                        <ErrorMessage name="horaDesde" component="div" />

                        <Field name="horaHasta" as={TextField} label="Hora Hasta" type="datetime-local" InputLabelProps={{ shrink: true }} />
                        <ErrorMessage name="horaHasta" component="div" />

                        <Field name="todoElDia" as={TextField} label="Todo el Día" />
                        <ErrorMessage name="todoElDia" component="div" />

                        <NumericFormat
                            customInput={TextField}
                            label="Costo del Evento"
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" GS"
                            onValueChange={(values) => {
                                setFieldValue('costoEvento', values.value);
                            }}
                        />
                        <ErrorMessage name="costoEvento" component="div" />

                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Crear
                        </Button>
                    </Box>

                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Evento creado exitosamente!
                        </Alert>
                    </Snackbar>
                </Form>
            )}
        </Formik>
    );
};

export default EventForm;
