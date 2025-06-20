import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { postCargarIngreso } from "../../api/ApiIngresos";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import CustomModal from "../../components/genericos/CustomModal";
import SelectTipoIngresoComponent from "../../components/genericos/SeleccionarTipoIngreso";
import { formatearFechaLocal } from "../../helpers/fechas";
import NuevoIngresoDto from "../../models/dtos/ingresos/NuevoIngresoDto.models";
import { TiposIngreso } from "../../models/responses/ingresos/TipoIngreso.response";

const validationSchema = yup.object({
  idTipoIngreso: yup.string().required("El tipo de Ingreso es requerido"),
  descripcionIngreso: yup.string().required("La descripcion es requerida"),
  montoIngreso: yup.string().required("El monto es requerido"),
  fechaIngreso: yup.string().required("la fecha de ingreso es requerida"),
});

export const FormIngresos = () => {
  const [tipoIngreso, setTipoIngreso] = useState<TiposIngreso | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isErrorModal, setIsErrorModal] = useState(false);

  const handleCustomModalClose = () => {
    formik.resetForm();
    setShowModal(false);
  };

  useEffect(() => {
    if (tipoIngreso) {
      formik.setFieldValue("idTipoIngreso", tipoIngreso.idTipo);
    }
  }, [tipoIngreso]);

  const formik = useFormik({
    initialValues: {
      idTipoIngreso: 0,
      descripcionIngreso: "",
      montoIngreso: 0,
      fechaIngreso: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevoIngreso: NuevoIngresoDto) => {
      try {
        const dtoCast: NuevoIngresoDto = {
          ...nuevoIngreso,
          fechaIngreso: formatearFechaLocal(nuevoIngreso.fechaIngreso),
          montoIngreso: Number(nuevoIngreso.montoIngreso),
        };
        const cargarIngreso = await postCargarIngreso(dtoCast);
        if (cargarIngreso) {
          setIsErrorModal(false);
          setModalMessage(cargarIngreso.msg);
          setShowModal(true);
        }
      } catch (error) {
        setIsErrorModal(true);
        setModalMessage("Error al cargar el ingreso");
        setShowModal(true);
      }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Ingresos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SelectTipoIngresoComponent
              fullWidth
              setTipoIngresoSeleccionado={setTipoIngreso}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="descripcionIngreso"
              name="descripcionIngreso"
              label="Descripcion"
              value={formik.values.descripcionIngreso}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.descripcionIngreso &&
                Boolean(formik.errors.descripcionIngreso)
              }
              helperText={
                formik.touched.descripcionIngreso &&
                formik.errors.descripcionIngreso
              }
            />
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              fullWidth
              customInput={TextField}
              thousandSeparator={"."}
              decimalSeparator=","
              suffix=" Gs."
              id="montoIngreso"
              name="montoIngreso"
              label="Monto"
              value={formik.values.montoIngreso}
              onValueChange={(values) =>
                formik.setFieldValue("montoIngreso", values.value)
              }
              onBlur={formik.handleBlur}
              error={
                formik.touched.montoIngreso &&
                Boolean(formik.errors.montoIngreso)
              }
              helperText={
                formik.touched.montoIngreso && formik.errors.montoIngreso
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              id="fechaIngreso"
              name="fechaIngreso"
              label="Fecha de Ingreso"
              value={formik.values.fechaIngreso}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fechaIngreso &&
                Boolean(formik.errors.fechaIngreso)
              }
              helperText={
                formik.touched.fechaIngreso && formik.errors.fechaIngreso
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid
            justifyContent={"center"}
            alignItems={"center"}
            container
            mt={2}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              style={{ minWidth: "250px" }}
            >
              Crear
            </Button>
          </Grid>
        </Grid>
      </form>
      <CustomModal
        open={showModal}
        onClose={handleCustomModalClose}
        message={modalMessage}
        isError={isErrorModal}
      />
    </ContainerComponent>
  );
};

export default FormIngresos;
