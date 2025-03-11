import { Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { crearNuevoProfesor } from "../../api/ApiProfesores";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { NuevoProfesorDto } from "../../models/dtos/profesores/NuevoProfesorDto.models";
import { ProfesoresFormateado } from "../../models/responses/profesores/NominaProfesores.response";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../features/ui/ui.slice";

const validationSchema = yup.object({
  nombreProfe: yup.string().required("El nombre es requerido"),
  numeroCedula: yup.string().required("La Cedula es requerida"),
  precioXHora: yup.string().required("El precio por hora es requerido"),
  contactoProfesor: yup.string().required("El telefono es requerido"),
  crearUsuario: yup.string().required("El usuario es requerido"),
  nombreUsuario: yup.string().required("El nombre de usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

const FormProfesores = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const profesorCargado = location.state as ProfesoresFormateado;
  const [loadingCrearProfesor, setLoadingCrearProfesor] = useState(false);
  const formik = useFormik({
    initialValues: {
      nombreProfe: profesorCargado?.nombreProfesor ?? "",
      contactoProfesor: profesorCargado?.contactoProfesor ?? "",
      numeroCedula: profesorCargado?.cedula ?? "",
      precioXHora: profesorCargado?.costoXHora ?? 0,
      crearUsuario: true,
      nombreUsuario: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevoProfesor: NuevoProfesorDto, { resetForm }) => {
      setLoadingCrearProfesor(true);
      if (profesorCargado !== null) {
        // await crearActualizarEliminarProfesor(
        //   "actualizar",
        //   nuevoProfesor,
        //   profesorCargado.idProfesor
        // );
      } else {
        try {
          console.log(nuevoProfesor);

          const crearProfesor = await crearNuevoProfesor({
            ...nuevoProfesor,
            precioXHora: Number(nuevoProfesor.precioXHora),
          });
          if (crearProfesor) {
            dispatch(setSuccess(crearProfesor.msg));
            resetForm();
          }
        } finally {
          setLoadingCrearProfesor(false);
        }
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Profesores
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="nombreProfe"
              name="nombreProfe"
              label="Nombre"
              value={formik.values.nombreProfe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nombreProfe && Boolean(formik.errors.nombreProfe)
              }
              helperText={
                formik.touched.nombreProfe && formik.errors.nombreProfe
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="numeroCedula"
              name="numeroCedula"
              label="Numero de cedula"
              value={formik.values.numeroCedula}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numeroCedula &&
                Boolean(formik.errors.numeroCedula)
              }
              helperText={
                formik.touched.numeroCedula && formik.errors.numeroCedula
              }
            />
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              fullWidth
              thousandSeparator={"."}
              decimalSeparator=","
              suffix=" Gs."
              customInput={TextField}
              id="precioXHora"
              name="precioXHora"
              label="Precio por Hora"
              value={formik.values.precioXHora}
              onValueChange={(values) => {
                const { floatValue } = values; // Aquí obtenemos el valor sin formato
                formik.setFieldValue("precioXHora", floatValue);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.precioXHora && Boolean(formik.errors.precioXHora)
              }
              helperText={
                formik.touched.precioXHora && formik.errors.precioXHora
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="nombreUsuario"
              name="nombreUsuario"
              label="Nombre de Usuario"
              value={formik.values.nombreUsuario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nombreUsuario &&
                Boolean(formik.errors.nombreUsuario)
              }
              helperText={
                formik.touched.nombreUsuario && formik.errors.nombreUsuario
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="contactoProfesor"
              name="contactoProfesor"
              label="Numero de telefono"
              value={formik.values.contactoProfesor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactoProfesor &&
                Boolean(formik.errors.contactoProfesor)
              }
              helperText={
                formik.touched.contactoProfesor &&
                formik.errors.contactoProfesor
              }
            />
          </Grid>
          <Grid
            justifyContent={"center"}
            alignItems={"center"}
            container
            mt={2}
          >
            <CustomButton
              loading={loadingCrearProfesor}
              text={profesorCargado ? "Actualizar" : "Crear"}
              variant="contained"
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </ContainerComponent>
  );
};

export default FormProfesores;
