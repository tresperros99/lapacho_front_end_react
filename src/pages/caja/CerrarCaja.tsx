import { CircularProgress, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { putCerrarCaja } from "../../api/ApiCaja";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";

const validationSchema = yup.object({
  montoInicial: yup.string().required("El monto inicial es requerido"),
});

export const CerrarCaja = () => {
  const dispatch = useDispatch();
  const [loadingCerrarCaja, setLoadingCerrarCaja] = useState(false);
  const formik = useFormik({
    initialValues: {
      montoInicial: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setLoadingCerrarCaja(true);
      try {
        const cerrarCaja = await putCerrarCaja();
        if (cerrarCaja) {
          dispatch(setSuccess(cerrarCaja.msg));
        }
      } finally {
        setLoadingCerrarCaja(false);
      }
    },
  });
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Cerrar Caja
      </Typography>
      <Grid container>
        {loadingCerrarCaja ? (
          <CircularProgress disableShrink />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Grid container item xs={12} spacing={2}>
              <Grid container item xs={12} mb={2}>
                <Grid item>
                  <CustomButton text="Cerrar Caja Activa" type="submit" />
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
    </ContainerComponent>
  );
};

export default CerrarCaja;
