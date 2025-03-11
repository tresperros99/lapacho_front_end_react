import { Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { postCargarTalonario } from "../../api/ApiFacturas";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import CargarTalonarioDto from "../../models/dtos/facturacion/CargarTalonarioDto.model";

const validationSchema = yup.object({
  nroTimbrado: yup.number().required("El timbrado es requerido"),
  codEstablecimiento: yup
    .string()
    .required("El codigo de establecimiento es requerido"),
  puntoExpedicion: yup.string().required("El punto de expedicion requerido"),
  fechaVencimiento: yup.date().required("la fecha es requerida"),
  numeroDesde: yup.number().required("El numero desde es requerido"),
  numeroHasta: yup.number().required("El numero hasta es requerido"),
  rucEmisor: yup.string().required("El ruc emisor es requerido"),
  razonSocial: yup.string().required("La razon social es requerida"),
});

const CargarTalonario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCrearTalonario, setLoadingCrearTalonario] = useState(false);
  const formik = useFormik({
    initialValues: {
      nroTimbrado: 0,
      codEstablecimiento: "001",
      puntoExpedicion: "001",
      fechaVencimiento: new Date(),
      numeroDesde: 0,
      numeroHasta: 1,
      rucEmisor: "",
      razonSocial: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (cargarTalonario: CargarTalonarioDto) => {
      setLoadingCrearTalonario(true);

      try {
        const crearTalonario = await postCargarTalonario(cargarTalonario);
        if (crearTalonario) {
          dispatch(setSuccess(crearTalonario.msg));
          // resetForm();
          navigate("/");
        }
      } finally {
        setLoadingCrearTalonario(false);
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Cargar Talonario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="nroTimbrado"
              name="nroTimbrado"
              label="Numero de Timbrado"
              value={formik.values.nroTimbrado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nroTimbrado && Boolean(formik.errors.nroTimbrado)
              }
              helperText={
                formik.touched.nroTimbrado && formik.errors.nroTimbrado
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="razonSocial"
              name="razonSocial"
              label="Razon social"
              value={formik.values.razonSocial}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.razonSocial && Boolean(formik.errors.razonSocial)
              }
              helperText={
                formik.touched.razonSocial && formik.errors.razonSocial
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="codEstablecimiento"
              name="codEstablecimiento"
              label="Codigo de Establecimiento"
              value={formik.values.codEstablecimiento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.codEstablecimiento &&
                Boolean(formik.errors.codEstablecimiento)
              }
              helperText={
                formik.touched.codEstablecimiento &&
                formik.errors.codEstablecimiento
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="puntoExpedicion"
              name="puntoExpedicion"
              label="Punto de expedicion"
              value={formik.values.puntoExpedicion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.puntoExpedicion &&
                Boolean(formik.errors.puntoExpedicion)
              }
              helperText={
                formik.touched.puntoExpedicion && formik.errors.puntoExpedicion
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              label="Fecha de vencimiento "
              value={formik.values.fechaVencimiento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fechaVencimiento &&
                Boolean(formik.errors.fechaVencimiento)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              id="numeroDesde"
              name="numeroDesde"
              label="Numero desde"
              value={formik.values.numeroDesde}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numeroDesde && Boolean(formik.errors.numeroDesde)
              }
              helperText={
                formik.touched.numeroDesde && formik.errors.numeroDesde
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              id="numeroHasta"
              name="numeroHasta"
              label="Numero hasta"
              value={formik.values.numeroHasta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numeroHasta && Boolean(formik.errors.numeroHasta)
              }
              helperText={
                formik.touched.numeroHasta && formik.errors.numeroHasta
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="rucEmisor"
              name="rucEmisor"
              label="Ruc Emisor"
              value={formik.values.rucEmisor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.rucEmisor && Boolean(formik.errors.rucEmisor)
              }
              helperText={formik.touched.rucEmisor && formik.errors.rucEmisor}
            />
          </Grid>

          <Grid
            justifyContent={"center"}
            alignItems={"center"}
            container
            mt={2}
          >
            <CustomButton
              loading={loadingCrearTalonario}
              text="Crear"
              variant="contained"
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </ContainerComponent>
  );
};

export default CargarTalonario;
