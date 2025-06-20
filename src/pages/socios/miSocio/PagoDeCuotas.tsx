import {
  Alert,
  Button,
  Checkbox,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCuotasPendientesSocio } from "../../../api/ApiCuotas";
import { postGenerarVentaCuotasVarias } from "../../../api/ApiVentas";
import ModalConfirmacion from "../../../components/genericos/Shared/ModalConfirmacion";
import { separadorMiles } from "../../../helpers/Numbers";
import { formatearFechaTipoDate } from "../../../helpers/fechas";
import GenerarVentaCuotasVariasDto, {
  Cuota as CuotaAPagar,
} from "../../../models/dtos/ventas/cuotas/GenerarVentaCuotasVariasDto.model";
import { Cuota } from "../../../models/responses/cuotas/ListadoCuotasPendientesSocio.response";

interface Props {
  numeroCedula: string;
  setReloadData?: React.Dispatch<React.SetStateAction<boolean>>;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PagoDeCuotas = ({ numeroCedula, setReloadData, setExpanded }: Props) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [cuotasSocio, setCuotasSocio] = useState<Cuota[]>([]);
  const [selectedCuotas, setSelectedCuotas] = useState<CuotaAPagar[]>([]);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getCuotasSocio = async (numeroCedula: string, annio: string) => {
    const cuotasSocio = await getCuotasPendientesSocio(numeroCedula, annio);
    if (cuotasSocio) {
      const sortedCuotas = cuotasSocio.cuotas.sort((a, b) => {
        if (a.nombresocio < b.nombresocio) {
          return -1;
        }
        if (a.nombresocio > b.nombresocio) {
          return 1;
        }
        return Number(a.numeroMEs) - Number(b.numeroMEs);
      });
      setCuotasSocio(sortedCuotas);
    }
  };

  const handleCheckboxChange = (socio: Cuota) => {
    if (socio.fechaPago) {
      return;
    }

    const selected = selectedCuotas.some(
      (cuota) => cuota.idSocioCuota === socio.idCuotaSocio,
    );
    if (selected) {
      setSelectedCuotas(
        selectedCuotas.filter(
          (cuota) => cuota.idSocioCuota !== socio.idCuotaSocio,
        ),
      );
    } else {
      if (
        selectedCuotas.length > 0 &&
        selectedCuotas[0].idSocioCuota !== socio.idsocio
      ) {
        setAlertOpen(true);
        return;
      }
      setSelectedCuotas([
        ...selectedCuotas,
        {
          idInscripcion: null,
          idSocioCuota: socio.idCuotaSocio,
          estado: false,
          idReserva: null,
          monto: socio.montoCuota,
        },
      ]);
    }
  };

  const handlePagar = async () => {
    const payload: GenerarVentaCuotasVariasDto = {
      cliente: numeroCedula,
      cuotas: selectedCuotas,
    };
    try {
      const pagoCuotaResp = await postGenerarVentaCuotasVarias(payload);
      if (pagoCuotaResp) {
        setSuccessAlertOpen(true);

        setSelectedCuotas([]);
        await getCuotasSocio(numeroCedula, currentYear.toString());
      }
      setExpanded && setExpanded(false);
    } finally {
      setModalOpen(false);
      setReloadData && setReloadData(true);
    }
  };

  useEffect(() => {
    getCuotasSocio(numeroCedula, currentYear.toString());
  }, [numeroCedula, currentYear]);

  return (
    <Grid container>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Pago de Cuotas
      </Typography>
      <Grid container>
        {cuotasSocio.length > 0 ? (
          <Grid item xs={12}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Socio</TableCell>
                  <TableCell align="right">Cedula</TableCell>
                  <TableCell align="right">Mes</TableCell>
                  <TableCell align="right">Fecha de vencimiento</TableCell>
                  <TableCell align="right">Fecha de Pago</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell align="right">Pagar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cuotasSocio.map((socio) => (
                  <TableRow
                    key={socio.idCuotaSocio}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {socio.nombresocio}
                    </TableCell>
                    <TableCell align="right">
                      {separadorMiles(socio.cedula, true)}
                    </TableCell>
                    <TableCell align="right">{socio.cuotaMes}</TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(socio.fechaVencimiento)}
                    </TableCell>
                    <TableCell align="right">
                      {socio.fechaPago
                        ? formatearFechaTipoDate(socio.fechaPago)
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell align="right">
                      {separadorMiles(socio.montoCuota, true)}
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        checked={selectedCuotas.some(
                          (cuota) => cuota.idSocioCuota === socio.idCuotaSocio,
                        )}
                        onChange={() => handleCheckboxChange(socio)}
                        disabled={!!socio.fechaPago}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Grid container item xs={12} justifyContent={"flex-end"} mt={2}>
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                Generar movimiento de pago
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} justifyContent={"center"} mt={8}>
            <Typography textAlign={"center"} color={"gray"}>
              Busque el Socio para ver sus cuotas Pendientes
            </Typography>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="warning">
          Solo se pueden seleccionar cuotas del mismo socio.
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <Alert onClose={() => setSuccessAlertOpen(false)} severity="success">
          Cuota Agregada Correctamente.
        </Alert>
      </Snackbar>
      <ModalConfirmacion
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handlePagar={handlePagar}
      />
    </Grid>
  );
};

export default PagoDeCuotas;
