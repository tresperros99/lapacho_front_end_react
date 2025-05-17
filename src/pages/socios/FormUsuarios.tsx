import { Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { postCrearUsuario } from "../../api/ApiAuth";
import BuscadorSocios from "../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import { DataUser, encryptPassword } from "../../helpers/auth";
import CrearUsuarioDto from "../../models/dtos/usuarios/CrearUsuarioDto.models";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

const validationSchema = yup.object({
  contrasenia: yup.string().required("La contraseña es requerida"),
  nombreUsuario: yup.string().required("El nombre de usuario es requerido"),
});

const FormUsuarios = () => {
  const dispatch = useDispatch();

  const [loadingCrearEvento, setLoadingCrearEvento] = useState(false);

  const [cliente, setCliente] = useState<Socio | null>(null);
  const handleSelectCliente = (cliente: Socio | null) => {
    setCliente(cliente);
  };
  const formik = useFormik({
    initialValues: {
      contrasenia: "",
      nombreUsuario: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!cliente) {
          console.error("Faltan datos");
          return;
        }
        
        console.log(values.nombreUsuario,values.contrasenia);
        
        const encryptDataUser:DataUser = {
            usuario: values.nombreUsuario,
            contraseña: values.contrasenia,
        }


        const nuevoUsuarioPayload: CrearUsuarioDto = {
          cedula: cliente.cedula,
          idCliente: cliente.idCliente,
          contraseña: encryptPassword(encryptDataUser),
          idAcceso: 1,
          nombreUsuario: values.nombreUsuario,
        };

        setLoadingCrearEvento(true);

        const nuevoUsuarioResp = await postCrearUsuario(nuevoUsuarioPayload);

        if (nuevoUsuarioResp) {
          dispatch(setSuccess(nuevoUsuarioResp.msg));
        }
      } finally {
        setLoadingCrearEvento(false);
        resetForm();
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Usuarios
        </Typography>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={6}>
            <BuscadorSocios onSelect={handleSelectCliente} margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="dense"
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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="dense"
              id="contrasenia"
              type="password"
              name="contrasenia"
              label="Contraseña"
              value={formik.values.contrasenia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contrasenia &&
                Boolean(formik.errors.contrasenia)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <CustomButton
              text="Crear"
              type="submit"
              loading={loadingCrearEvento}
            />
          </Grid>
        </Grid>
      </form>
    </ContainerComponent>
  );
};

export default FormUsuarios;
