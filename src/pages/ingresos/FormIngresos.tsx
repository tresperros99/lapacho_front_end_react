import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as yup from 'yup';
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import NuevoIngresoDto from "../../models/dtos/ingresos/NuevoIngresoDto.models";

const validationSchema = yup.object({
    idTipoIngreso: yup.string().required('El tipo de Ingreso es requerido'),
    descripcionIngreso: yup.string().required('La descripcion es requerida'),
    montoIngreso: yup.string().required('El monto es requerido'),
    idSocio: yup.string().required('El socio es requerido'),
});

export const FormIngresos = () => {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const formik = useFormik({
        initialValues:
        {
            idTipoIngreso: 0,
            descripcionIngreso: '',
            montoIngreso: 0,
            idSocio: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (nuevoIngreso: NuevoIngresoDto) => {

        },
    });
    return (
        <ContainerComponent>
            <form onSubmit={formik.handleSubmit}>
                <Typography textAlign={'center'} variant='h4' marginBottom={2}>Creacion de Ingresos</Typography>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            value={formik.values.descripcionIngreso}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.descripcionIngreso && Boolean(formik.errors.descripcionIngreso)}
                            helperText={formik.touched.descripcionIngreso && formik.errors.descripcionIngreso}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="monto"
                            name="monto"
                            label="Monto"
                            value={formik.values.montoIngreso}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.montoIngreso && Boolean(formik.errors.montoIngreso)}
                            helperText={formik.touched.montoIngreso && formik.errors.montoIngreso}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="Socio"
                            name="Socio"
                            label="Socio"
                            value={formik.values.idSocio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.idSocio && Boolean(formik.errors.idSocio)}
                            helperText={formik.touched.idSocio && formik.errors.idSocio}
                        />
                    </Grid>
                    <Grid xs={12} justifyContent={'center'} alignItems={'center'} container mt={2}>
                        <Button color="primary" variant="contained" type="submit" style={{ minWidth: "250px" }} >
                            {false ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Grid>


                </Grid>
            </form>

        </ContainerComponent>
    )
}


export default FormIngresos;