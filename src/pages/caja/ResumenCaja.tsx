import React from "react";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  useTheme,
  TablePagination,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { MovimientosDeCaja } from "../../models/responses/caja/ResumenCajaXFecha";
import { separadorMiles } from "../../helpers/Numbers";




interface ResumenCajaProps {
  movimientosDeCaja: MovimientosDeCaja[];
  loadingResumen: boolean;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ResumenCaja: React.FC<ResumenCajaProps> = ({
  movimientosDeCaja,
  loadingResumen,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loadingResumen) {
    return (
      <Grid container justifyContent={"center"} mt={4}>
        <CircularProgress disableShrink />
      </Grid>
    );
  }

  return (
    <>
      {isMobile ? (
        <Grid container spacing={2} mt={1}>
          {movimientosDeCaja.map((movimiento, index) => (
            <Grid item xs={12} key={movimiento.nroComprobante + index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Fecha de Emisión
                </Typography>
                <Typography variant="body1">
                  {movimiento.fechaEmision}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={1}>
                  Tipo de Comprobante
                </Typography>
                <Typography variant="body1">
                  {movimiento.tipoComprobante}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={1}>
                  Tipo de Operación
                </Typography>
                <Typography variant="body1">
                  {movimiento.tipoOperacion}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={1}>
                  Nro. Comprobante
                </Typography>
                <Typography variant="body1">
                  {movimiento.nroComprobante}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={1}>
                  Monto
                </Typography>
                <Typography variant="body1">
                  {separadorMiles(movimiento.monto, true)}
                </Typography>

                <Grid container justifyContent="flex-end" mt={2}>
                  <VisibilityOutlinedIcon sx={{ cursor: "pointer" }} />
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla resumen de caja">
            <TableHead>
              <TableRow>
                <TableCell align="left">Fecha de Emisión</TableCell>
                <TableCell align="right">Tipo de Comprobante</TableCell>
                <TableCell align="right">Tipo de Operación</TableCell>
                <TableCell align="right">Nro. Comprobante</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Ver Detalle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movimientosDeCaja.map((movimiento, index) => (
                <TableRow
                  key={movimiento.nroComprobante + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    {movimiento.fechaEmision}
                  </TableCell>
                  <TableCell align="right">
                    {movimiento.tipoComprobante}
                  </TableCell>
                  <TableCell align="right">
                    {movimiento.tipoOperacion}
                  </TableCell>
                  <TableCell align="right">
                    {movimiento.nroComprobante}
                  </TableCell>
                  <TableCell align="right">
                    {separadorMiles(movimiento.monto, true)}
                  </TableCell>
                  <TableCell align="right">
                    <VisibilityOutlinedIcon sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
};

export default ResumenCaja;
