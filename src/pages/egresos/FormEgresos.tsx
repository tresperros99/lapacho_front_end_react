
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { postCargarEgreso } from "../../api/ApiEgresos";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import CustomModal from "../../components/genericos/CustomModal";
import SelectTipoIngresoComponent from "../../components/genericos/SeleccionarTipoIngreso";
import { formatearFechaLocal } from "../../helpers/fechas";
import NuevoEgresoDto from "../../models/dtos/egresos/NuevoEgresoDto.model";
import { TiposIngreso } from "../../models/responses/ingresos/TipoIngreso.response";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

// Definición de las propiedades del formulario

const validationSchema = yup.object({
    idTipoEgreso: yup.number().required('El tipo de Egreso es requerido'),
    descripcionEgreso: yup.string().required('La descripción es requerida'),
    montoEngreso: yup.number().required('El monto es requerido'),
    nroFactura: yup.string().required('El número de factura es requerido'),
    fechaPago: yup.string().required('La fecha de pago es requerida'),
});

export const FormEgresos = () => {
    const [socioSeleccionado, setSocioSeleccionado] = useState<Socio | null>(null);
    const [tipoIngreso, setTipoIngreso] = useState<TiposIngreso | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isErrorModal, setIsErrorModal] = useState(false);

    const handleCustomModalClose = () => {
        // Cierra el modal de éxito
        formik.resetForm();
        setShowModal(false);
    };

    useEffect(() => {
        if (socioSeleccionado) {
            formik.setFieldValue('idSocio', Number(socioSeleccionado.idSocio))
        }
    }, [socioSeleccionado]);
    useEffect(() => {
        if (tipoIngreso) {
            formik.setFieldValue('idTipoEgreso', tipoIngreso.idTipo)
        }
    }, [tipoIngreso]);

    const formik = useFormik({
        initialValues:
        {
            idTipoEgreso: 0,
            descripcionEgreso: '',
            montoEngreso: 0,
            nroFactura: '',
            fechaPago: '', // Fecha inicial
        },
        validationSchema: validationSchema,
        onSubmit: async (nuevoEgreso: NuevoEgresoDto) => {
            //TODO: llamar a la api para cargar egreso
            try {
                const formatearDto: NuevoEgresoDto = { ...nuevoEgreso, fechaPago: formatearFechaLocal(nuevoEgreso.fechaPago), montoEngreso: Number(nuevoEgreso.montoEngreso) }

                const cargarEgreso = await postCargarEgreso(formatearDto);
                if (cargarEgreso) {
                    setIsErrorModal(false);
                    setModalMessage(cargarEgreso.msg);
                    setShowModal(true);
                }
            } catch (error) {
                setIsErrorModal(true);
                setModalMessage('Error al cargar el egreso');
                setShowModal(true);
            }
        },
    });

    return (
        <ContainerComponent>
            <form onSubmit={formik.handleSubmit}>
                <Typography textAlign={'center'} variant='h4' marginBottom={2}>Creación de Egresos</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SelectTipoIngresoComponent fullWidth setTipoIngresoSeleccionado={setTipoIngreso} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="text"
                            id="descripcionEgreso"
                            name="descripcionEgreso"
                            label="Descripción"
                            value={formik.values.descripcionEgreso}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.descripcionEgreso && Boolean(formik.errors.descripcionEgreso)}
                            helperText={formik.touched.descripcionEgreso && formik.errors.descripcionEgreso}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="montoEngreso"
                            name="montoEngreso"
                            label="Monto"
                            value={formik.values.montoEngreso}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.montoEngreso && Boolean(formik.errors.montoEngreso)}
                            helperText={formik.touched.montoEngreso && formik.errors.montoEngreso}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="nroFactura"
                            name="nroFactura"
                            label="Número de Factura"
                            value={formik.values.nroFactura}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nroFactura && Boolean(formik.errors.nroFactura)}
                            helperText={formik.touched.nroFactura && formik.errors.nroFactura}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            id="fechaPago"
                            name="fechaPago"
                            label="Fecha de Pago"
                            value={formik.values.fechaPago}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fechaPago && Boolean(formik.errors.fechaPago)}
                            helperText={formik.touched.fechaPago && formik.errors.fechaPago}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>
                    <Grid justifyContent={'center'} alignItems={'center'} container mt={2}>
                        <Button color="primary" variant="contained" type="submit" style={{ minWidth: "250px" }} >
                            {false ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <CustomModal open={showModal} onClose={handleCustomModalClose} message={modalMessage} isError={isErrorModal} />
        </ContainerComponent>
    )
}

export default FormEgresos;
