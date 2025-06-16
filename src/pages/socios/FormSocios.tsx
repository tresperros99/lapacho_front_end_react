import { TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { crearNuevoSocio, putEditarSocio } from "../../api/ApiSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { SelectTipoSocio } from "../../components/genericos/SelectTipoSocio";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import { formatDateEs } from "../../helpers/fechas";
import NuevoSocioDto from "../../models/dtos/socios/NuevoSocioDto.model";
import { Socio } from "../../models/responses/socios/NominaSocios.response";

const validationSchema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
  cedula: yup.string().required("La cedula es requerida"),
  fechaNacimiento: yup.string().required("La fecha de nacimiento es requerida"),
  correo: yup.string().required("El correo es requerido"),
  numeroTel: yup.string().required("El numero de telefono es requerido"),
  direccion: yup.string().required("La direccion es requerida"),
  tipoSocio: yup.string().required("El tipo de usuario es requerido"),
  estadoSocio: yup.string().required("El estado del socio es requerido"),
});

const getInitialValues = (socio?: Socio): NuevoSocioDto => ({
  nombre: socio?.nombreSocio.split(" ")[0] ?? "",
  apellido: socio?.nombreSocio.split(" ").slice(1).join(" ") ?? "",
  cedula: socio?.cedula ?? "",
  fechaNacimiento: socio?.fechaNacimiento.toString() ?? "",
  correo: socio?.correoElectronico ?? "",
  numeroTel: socio?.numeroTelefono ?? "",
  direccion: socio?.direccion ?? "",
  tipoSocio: socio?.idTipoSocio ?? 1,
  estadoSocio: Number(socio?.estadoSocio) ?? 1,
});

const FormSocios = () => {
  const location = useLocation();
  const socioCargado = location.state as Socio;
  const isEdicion = !!socioCargado;
  const dispatch = useDispatch();
  const [loadingCrearSocio, setLoadingCrearSocio] = useState(false);
  const formik = useFormik<NuevoSocioDto>({
    initialValues: getInitialValues(socioCargado),
    validationSchema: validationSchema,
    onSubmit: async (nuevoSocio: NuevoSocioDto, { resetForm }) => {
      try {
        setLoadingCrearSocio(true);
        const dtoFormateado = {
          ...nuevoSocio,
          fechaNacimiento: formatDateEs(nuevoSocio.fechaNacimiento),
        };
        if (isEdicion) {
          const resp = await putEditarSocio(dtoFormateado);
          dispatch(setSuccess(resp?.msg ?? "Socio actualizado"));
        } else {
          const resp = await crearNuevoSocio(dtoFormateado);
          dispatch(setSuccess(resp?.msg ?? "Socio creado"));
          resetForm();
        }
      } finally {
        setLoadingCrearSocio(false);
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          {isEdicion ? "Edición de Socios" : "Creación de Socios"}
        </Typography>
        <Grid2 container spacing={2} xs={12}>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="apellido"
              name="apellido"
              label="Apellido"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.apellido && Boolean(formik.errors.apellido)}
              helperText={formik.touched.apellido && formik.errors.apellido}
            />
          </Grid2>
          <Grid2 xs={6}>
            <SelectTipoSocio
              name="tipoSocio"
              value={formik.values.tipoSocio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.tipoSocio && Boolean(formik.errors.tipoSocio)
              }
              helperText={
                formik.touched.tipoSocio ? formik.errors.tipoSocio : ""
              }
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="cedula"
              name="cedula"
              label="Cedula"
              value={formik.values.cedula}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cedula && Boolean(formik.errors.cedula)}
              helperText={formik.touched.cedula && formik.errors.cedula}
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              label="Fecha de Nacimiento"
              InputLabelProps={{ shrink: true }}
              value={formik.values.fechaNacimiento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fechaNacimiento &&
                Boolean(formik.errors.fechaNacimiento)
              }
              helperText={
                formik.touched.fechaNacimiento && formik.errors.fechaNacimiento
              }
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="correo"
              name="correo"
              label="Correo"
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="numeroTel"
              name="numeroTel"
              label="Numero de Telefono"
              value={formik.values.numeroTel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numeroTel && Boolean(formik.errors.numeroTel)
              }
              helperText={formik.touched.numeroTel && formik.errors.numeroTel}
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="direccion"
              name="direccion"
              label="Direccion"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.direccion && Boolean(formik.errors.direccion)
              }
              helperText={formik.touched.direccion && formik.errors.direccion}
            />
          </Grid2>
          <Grid2 xs={12}>
            <CustomButton
              text={isEdicion ? "Guardar cambios" : "Crear"}
              type="submit"
              loading={loadingCrearSocio}
            />
          </Grid2>
        </Grid2>
      </form>
    </ContainerComponent>
  );
};

export default FormSocios;
