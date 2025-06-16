import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import GenerarMovimientoDeCajaVentaDto from "../../models/dtos/caja/generarMovimientoDeCajaVentaDto.model";
import SelectTipoPago from "../../components/genericos/SelectTipoPago";
import { useEffect, useState } from "react";
import { TiposPago } from "../../models/responses/caja/ObtenerTipoPago.response";
import { getUltimoNumeroDeFactura } from "../../api/ApiFacturas";
import FileInput from "../../components/genericos/Shared/FileInput";

interface Props {
  open: boolean;
  handleClose: () => void;
  movimientoCajaVenta: GenerarMovimientoDeCajaVentaDto;
  setMovimientoCajaVenta: React.Dispatch<
    React.SetStateAction<GenerarMovimientoDeCajaVentaDto>
  >;
}
interface CabeceraFacturaVenta {
  nroFactura: string;
  nroTimbrado: number;
  idCliente: number;
  cedula: string;
  tipoPago: number;
  nroComprobante: string;
  comprobanteFile?: File;
}
// TODO: hay que tratar de obtener el ultimo numero de factura para cargar los campos con la api de victor
// si no esta cargado el talonario debera mandar a la pantalla de talonario
// si hay un error debera permitir cargar manualmente
const validationSchema = yup.object({
  nroFactura: yup.string().required("El numero de factura es requerido"),
  nroTimbrado: yup.number().required("El numero de timbrado es requerido"),
  idCliente: yup.number().required("El id de cliente es requerido"),
  cedula: yup.string().required("El numero de cedula es requerido"),
  tipoPago: yup.number().required("El tipo de pago es requerido"),
});

export const ModalFacturaVenta = ({
  open,
  handleClose,
  movimientoCajaVenta,
  setMovimientoCajaVenta,
}: Props) => {
  const [tipoPago, setTipoPago] = useState<TiposPago | null>(null);
  const [loadingUltimoNumeroFactura, setLoadingUltimoNumeroFactura] =
    useState(false);
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      nroFactura: "",
      nroTimbrado: 0,
      idCliente: 0,
      cedula: "",
      tipoPago: 1,
      nroComprobante: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (cabeceraFactura: CabeceraFacturaVenta) => {
      setMovimientoCajaVenta({
        ...movimientoCajaVenta,
        cedula: cabeceraFactura.cedula,
        nroComprobante: cabeceraFactura.nroFactura,
        nroFactura: cabeceraFactura.nroFactura,
        nroTimbrado: cabeceraFactura.nroTimbrado,
        tipoPago: cabeceraFactura.tipoPago,
        comprobanteFile: comprobanteFile ?? undefined
      });
      handleClose();
    },
  });

  const obtenerUltimoNumeroDeFactura = async () => {
    setLoadingUltimoNumeroFactura(true);
    const ultimaFactura = await getUltimoNumeroDeFactura();
    if (ultimaFactura) {
      formik.setValues({
        ...formik.values,
        nroFactura: ultimaFactura.factura.nroFactura,
        nroTimbrado: ultimaFactura.factura.timbrado,
      });
    }
    setLoadingUltimoNumeroFactura(false);
  };


  useEffect(() => {
    obtenerUltimoNumeroDeFactura();
  }, []);

useEffect(() => {
  if (tipoPago && formik.values.tipoPago !== tipoPago.idTipoPago) {
    formik.setFieldValue("tipoPago", tipoPago.idTipoPago);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [tipoPago]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="responsive-dialog-title" mb={2}>
          Generar Factura
        </DialogTitle>
        <DialogContent sx={{ mt: 2, zIndex: 2 }}>
          {loadingUltimoNumeroFactura ? (
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <CircularProgress disableShrink />
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  id="nroFactura"
                  name="nroFactura"
                  label="Numero de Factura"
                  value={formik.values.nroFactura}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nroFactura &&
                    Boolean(formik.errors.nroFactura)
                  }
                  helperText={
                    formik.touched.nroFactura && formik.errors.nroFactura
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  id="nroTimbrado"
                  name="nroTimbrado"
                  label="Numero de timbrado"
                  value={formik.values.nroTimbrado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nroTimbrado &&
                    Boolean(formik.errors.nroTimbrado)
                  }
                  helperText={
                    formik.touched.nroTimbrado && formik.errors.nroTimbrado
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  id="cedula"
                  name="cedula"
                  label="Numero de cedula"
                  value={formik.values.cedula}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                  helperText={formik.touched.cedula && formik.errors.cedula}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectTipoPago fullWidth setTipoPago={setTipoPago} />
              </Grid>
              {formik.values.tipoPago === 2 && (
                <Grid item xs={12}>
                <FileInput
                  onFileSelect={setComprobanteFile}
                  accept=".jpg,.png,.pdf"
                  label="Adjuntar comprobante"
                />
                </Grid>
              )}
              <Grid
                justifyContent={"center"}
                alignItems={"center"}
                container
                mt={2}
              >
                <CustomButton
                  text="Crear factura"
                  variant="contained"
                  type="submit"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ModalFacturaVenta;
