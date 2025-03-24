import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface PagoModalProps {
  open: boolean;
  handleClose: () => void;
  handlePagar: (nroFactura?: string, descripcionPago?: string) => void;
}

const PagoSchema = Yup.object().shape({
  nroFactura: Yup.string(),
  descripcionPago: Yup.string(),
});

const PagoCuotasModal: React.FC<PagoModalProps> = ({
  open,
  handleClose,
  handlePagar,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Pago de Cuotas</DialogTitle>
      <Formik
        initialValues={{ nroFactura: "", descripcionPago: "" }}
        validationSchema={PagoSchema}
        onSubmit={(values) => {
          handlePagar(values.nroFactura, values.descripcionPago);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                name="nroFactura"
                label="Número de Factura"
                fullWidth
                error={touched.nroFactura && !!errors.nroFactura}
                helperText={touched.nroFactura && errors.nroFactura}
              />
              <Field
                as={TextField}
                name="descripcionPago"
                label="Descripción del Pago"
                fullWidth
                error={touched.descripcionPago && !!errors.descripcionPago}
                helperText={touched.descripcionPago && errors.descripcionPago}
                multiline
                rows={4}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined"
              >
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Pagar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PagoCuotasModal;
