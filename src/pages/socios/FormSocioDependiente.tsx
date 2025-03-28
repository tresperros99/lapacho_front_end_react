import { TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { crearNuevoSocioDependiente } from "../../api/ApiSocios";
import BuscadorSocios from "../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { SelectTipoSocio } from "../../components/genericos/SelectTipoSocio";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import { formatDateEs } from "../../helpers/fechas";
import { Dependiente } from "../../models/dtos/socios/NuevoSocioDependienteDto.model";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

const validationSchema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
  cedula: yup.string().required("La cedula es requerida"),
  fechaNacimiento: yup.string().required("La fecha de nacimiento es requerida"),
  correo: yup.string().required("El correo es requerido"),
  numeroTel: yup.string().required("El numero de telefono es requerido"),
  direccion: yup.string().required("La direccion es requerida"),
  tipoSocio: yup.string().required("El tipo de usuario es requerido"),
});

const FormSocioDependiente = () => {
  const location = useLocation();
  const socioCargado = location.state as Socio;
  const [selectedSocio, setSelectedSocio] = useState<Socio | null>(null);
  const dispatch = useDispatch();
  const [loadingCrearSocioDependiente, setLoadingCrearSocioDependiente] =
    useState(false);

  const handleSelectSocio = (socio: Socio | null) => {
    setSelectedSocio(socio);
  };
  const formik = useFormik<Dependiente>({
    initialValues: {
      nombre: socioCargado?.nombreSocio.split(" ")[0] ?? "",
      apellido: socioCargado?.nombreSocio.split(" ").slice(1).join(" ") ?? "",
      cedula: socioCargado?.cedula ?? "",
      fechaNacimiento: socioCargado?.fechaNacimiento.toString() ?? "",
      correo: socioCargado?.correoElectronico ?? "",
      numeroTel: socioCargado?.numeroTelefono ?? "",
      direccion: socioCargado?.direccion ?? "",
      tipoSocio: socioCargado?.idTipoSocio ?? 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevoSocio: Dependiente, { resetForm }) => {
      if (selectedSocio) {
        try {
          setLoadingCrearSocioDependiente(true);
          const crearSocioDependiente = await crearNuevoSocioDependiente({
            idSocio: selectedSocio.idCliente,
            dependientes: [
              {
                ...nuevoSocio,
                fechaNacimiento: formatDateEs(nuevoSocio.fechaNacimiento),
              },
            ],
          });
          if (crearSocioDependiente) {
            dispatch(
              setSuccess(
                crearSocioDependiente.msg ??
                  "Socio Dependiente Creado Correctamente",
              ),
            );

            resetForm();
          }
        } finally {
          setLoadingCrearSocioDependiente(false);
        }
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Socio Dependientes
        </Typography>
        <Grid2 container spacing={2} xs={12}>
          <Grid2 xs={6}>
            <BuscadorSocios onSelect={handleSelectSocio} />
          </Grid2>
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
              text="Crear"
              type="submit"
              loading={loadingCrearSocioDependiente}
            />
          </Grid2>
        </Grid2>
      </form>
    </ContainerComponent>
  );
};

export default FormSocioDependiente;
