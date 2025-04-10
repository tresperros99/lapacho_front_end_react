import { TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { postCrearNuevoCliente } from "../../api/ApiCliente";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import { NuevoClienteDto } from "../../models/dtos";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

const validationSchema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  apellido: yup.string().required("El apellido es requerido"),
  cedula: yup.string().required("La cedula es requerida"),
  nroTelefono: yup.string().required("El numero de telefono es requerido"),
});

const FormClientes = () =>{
  const location = useLocation();
  const socioCargado = location.state as Socio;
  const dispatch = useDispatch();
  const [loadingCrearCliente, setLoadingCrearCliente] = useState(false);
  const formik = useFormik<NuevoClienteDto>({
    initialValues: {
      nombre: socioCargado?.nombreSocio.split(" ")[0] ?? "",
      apellido: socioCargado?.nombreSocio.split(" ").slice(1).join(" ") ?? "",
      cedula: socioCargado?.cedula ?? "",
      nroTelefono: socioCargado?.numeroTelefono ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevoCliente: NuevoClienteDto, { resetForm }) => {
      try {
        setLoadingCrearCliente(true);
        const nuevoClienteResp = await postCrearNuevoCliente(nuevoCliente);

        if (nuevoClienteResp) {
          dispatch(setSuccess(nuevoClienteResp.msg ?? "Cliente Creado"));
          resetForm();
        }
      } finally {
        setLoadingCrearCliente(false);
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Clientes
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
              id="nroTelefono"
              name="nroTelefono"
              label="Numero de Telefono"
              value={formik.values.nroTelefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nroTelefono && Boolean(formik.errors.nroTelefono)
              }
              helperText={formik.touched.nroTelefono && formik.errors.nroTelefono}
            />
          </Grid2>
          <Grid2 xs={12}>
            <CustomButton
              text="Crear"
              type="submit"
              loading={loadingCrearCliente}
            />
          </Grid2>
        </Grid2>
      </form>
    </ContainerComponent>
  );
}

export default FormClientes;
