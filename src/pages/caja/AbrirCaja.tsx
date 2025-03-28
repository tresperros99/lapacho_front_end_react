import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { postCrearCaja } from "../../api/ApiCaja";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../features/ui/ui.slice";
import { useState } from "react";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";

const validationSchema = yup.object({
  montoInicial: yup.string().required("El monto inicial es requerido"),
});

export const AbrirCaja = () => {
  const dispatch = useDispatch();
  const [loadingCrearCaja, setLoadingCrearCaja] = useState(false);
  const formik = useFormik({
    initialValues: {
      montoInicial: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async ({ montoInicial }) => {
      setLoadingCrearCaja(true);
      try {
        const crearCaja = await postCrearCaja(montoInicial);
        if (crearCaja) {
          dispatch(setSuccess(crearCaja.msg));
        }
      } finally {
        setLoadingCrearCaja(false);
      }
    },
  });
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Abrir Caja
      </Typography>
      <Grid container>
        {loadingCrearCaja ? (
          <CircularProgress disableShrink />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <NumericFormat
                  fullWidth
                  customInput={TextField}
                  thousandSeparator={"."}
                  decimalSeparator=","
                  suffix=" Gs."
                  id="montoInicial"
                  name="montoInicial"
                  label="Monto Inicial"
                  value={formik.values.montoInicial}
                  onValueChange={(values) =>
                    formik.setFieldValue("montoInicial", Number(values.value))
                  }
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.montoInicial &&
                    Boolean(formik.errors.montoInicial)
                  }
                  helperText={
                    formik.touched.montoInicial && formik.errors.montoInicial
                  }
                />
              </Grid>
              <Grid container item xs={12} mb={2}>
                <Grid item>
                  <CustomButton text="aceptar" type="submit" />
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
    </ContainerComponent>
  );
};

export default AbrirCaja;
