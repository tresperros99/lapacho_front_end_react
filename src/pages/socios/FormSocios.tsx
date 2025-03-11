import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { crearNuevoSocio } from "../../api/ApiSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { SelectAccesoUsuario } from "../../components/genericos/SelectAccesoUsuario";
import { SelectTipoSocio } from "../../components/genericos/SelectTipoSocio";
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
  idAcceso: yup.string().required("Debe seleccionar un tipo de acceso"),
  contraseña: yup.string().required("La contraseña es requerida"),
});
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

const FormSocios = () => {
  const location = useLocation();
  const socioCargado = location.state as Socio;

  const formik = useFormik<NuevoSocioDto>({
    initialValues: {
      nombre: socioCargado?.nombreSocio.split(" ")[0] ?? "",
      apellido: socioCargado?.nombreSocio.split(" ").slice(1).join(" ") ?? "",
      cedula: socioCargado?.cedula ?? "",
      fechaNacimiento: socioCargado?.fechaNacimiento.toString() ?? "",
      correo: socioCargado?.correoElectronico ?? "",
      numeroTel: socioCargado?.numeroTelefono ?? "",
      direccion: socioCargado?.direccion ?? "",
      tipoSocio: socioCargado?.idTipoSocio ?? 1,
      contraseña: "",
      estadoSocio: socioCargado?.estadoSocio ?? "",
      idAcceso: socioCargado?.idTipoSocio ?? 1,
      nombreUsuario: socioCargado?.nombreUsuario ?? "test",
      dependientes: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevoSocio: NuevoSocioDto) => {
      console.log(nuevoSocio);
      await crearNuevoSocio({
        ...nuevoSocio,
        fechaNacimiento: formatDate(nuevoSocio.fechaNacimiento),
      });

      // if (socioCargado !== null) {
      //     //TODO: actualizar nuevo socio
      //     await actualizarSocio(socioCargado.idSocio, { ...nuevoSocio, fechaNacimiento: formatDate(nuevoSocio.fechaNacimiento) });

      // } else {
      // }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Socios
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
            <TextField
              fullWidth
              id="nombreUsuario"
              name="nombreUsuario"
              label="Nombre de usuario"
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
          </Grid2>
          <Grid2 xs={6}>
            <SelectAccesoUsuario
              name="idAcceso"
              value={formik.values.idAcceso}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.idAcceso && Boolean(formik.errors.idAcceso)}
              helperText={formik.touched.idAcceso ? formik.errors.idAcceso : ""}
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
          <Grid2 xs={6}>
            <TextField
              fullWidth
              id="contraseña"
              name="contraseña"
              type="password"
              label="password"
              value={formik.values.contraseña}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contraseña && Boolean(formik.errors.contraseña)
              }
              helperText={formik.touched.contraseña && formik.errors.contraseña}
            />
          </Grid2>
          <Grid2 xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Crear
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </ContainerComponent>
  );
};

export default FormSocios;
