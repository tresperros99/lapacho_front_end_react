import { Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { crearActualizarEliminarProfesor } from '../../api/ApiProfesores';
import { ContainerComponent } from '../../components/genericos/ContainerComponent';
import { NuevoProfesorDto } from '../../models/dtos/profesores/NuevoProfesorDto.models';
import { ProfesoresFormateado } from '../../models/responses/profesores/NominaProfesores.response';

const validationSchema = yup.object({
    nombreProfe: yup.string().required('El nombre es requerido'),
    numeroCedula: yup.string().required('La Cedula es requerida'),
    precioXHora: yup.string().required('El precio por hora es requerido'),
    contactoProfesor: yup.string().required('El telefono es requerido'),
});


const FormProfesores = () => {
    const location = useLocation();
    const profesorCargado = location.state as ProfesoresFormateado;
    const formik = useFormik({
        initialValues:
        {
            nombreProfe: profesorCargado?.nombreProfesor ?? '',
            contactoProfesor: profesorCargado?.contactoProfesor ?? '',
            numeroCedula: profesorCargado?.cedula ?? '',
            precioXHora: profesorCargado?.costoXHora ?? 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (nuevoProfesor: NuevoProfesorDto) => {
            if (profesorCargado !== null) {
                await crearActualizarEliminarProfesor('actualizar', nuevoProfesor, profesorCargado.idProfesor);

            } else {
                await crearActualizarEliminarProfesor('crear', nuevoProfesor);
            }

        },
    });

    return (
        <ContainerComponent>
            <form onSubmit={formik.handleSubmit}>
                <Typography textAlign={'center'} variant='h4' marginBottom={2}>Creacion de Profesores</Typography>
                <Grid2 container spacing={2} xs={12}>
                    <Grid2 xs={6}>
                        <TextField
                            fullWidth
                            id="nombreProfe"
                            name="nombreProfe"
                            label="Nombre"
                            value={formik.values.nombreProfe}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nombreProfe && Boolean(formik.errors.nombreProfe)}
                            helperText={formik.touched.nombreProfe && formik.errors.nombreProfe}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            fullWidth
                            id="numeroCedula"
                            name="numeroCedula"
                            label="Numero de cedula"
                            value={formik.values.numeroCedula}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.numeroCedula && Boolean(formik.errors.numeroCedula)}
                            helperText={formik.touched.numeroCedula && formik.errors.numeroCedula}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            fullWidth
                            id="precioXHora"
                            name="precioXHora"
                            label="Precio por Hora"
                            value={formik.values.precioXHora}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.precioXHora && Boolean(formik.errors.precioXHora)}
                            helperText={formik.touched.precioXHora && formik.errors.precioXHora}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            fullWidth
                            id="contactoProfesor"
                            name="contactoProfesor"
                            label="Telefono"
                            value={formik.values.contactoProfesor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactoProfesor && Boolean(formik.errors.contactoProfesor)}
                            helperText={formik.touched.contactoProfesor && formik.errors.contactoProfesor}
                        />
                    </Grid2>
                    <Grid2 xs={12} justifyContent={'center'} alignItems={'center'} container mt={2}>
                        <Button color="primary" variant="contained" type="submit" style={{ minWidth: "250px" }} >
                            {profesorCargado ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Grid2>


                </Grid2>
            </form>
        </ContainerComponent>
    )
}

export default FormProfesores;