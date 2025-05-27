import {
  Box,
  CircularProgress,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"; // Importar el componente Grid
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  eliminarReservaDelClub,
  getReservasDelClub,
  postAgregarReservaAVenta,
} from "../../api/ApiReservas";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { ReservasClub } from "../../models/responses/reservas/ReservasDelClub.response";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../features/ui/ui.slice";
import {
  ArrowDropUpIcon,
  ArrowDropDownIcon,
  EditOutlinedIcon,
  DeleteOutlineOutlinedIcon,
  SellOutlinedIcon,
} from "../../components/icons";

const PanelReservas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const totalPaginas = 10;
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [reservas, setReservas] = useState<ReservasClub[]>([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const fetchReservasClub = useCallback(async () => {
    try {
      setLoadingReservas(true);
      if (fechaDesde && fechaHasta) {
        console.log(fechaDesde, fechaHasta, page);

        const responseData = await getReservasDelClub(
          fechaDesde,
          fechaHasta,
          page,
        );
        if (responseData) {
          console.log(responseData);

          setReservas(responseData.reservasClub);
        }
      }
    } finally {
      setLoadingReservas(false);
    }
  }, [fechaDesde, fechaHasta, page]);

  useEffect(() => {
    fetchReservasClub();
  }, [fetchReservasClub]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const editarReserva = (reserva: ReservasClub) => {
    navigate("/formReserva", { state: reserva });
  };

  const eliminarReserva = async (idReserva: number) => {
    const eliminado = await eliminarReservaDelClub(idReserva);
    if (eliminado && fechaDesde && fechaHasta) {
      await getReservasDelClub(fechaDesde, fechaHasta, page);
    }
  };

  const nuevoSocio = () => {
    navigate("/formReservas");
  };

  const handleSort = () => {
    const isAsc = orderBy === "asc";
    setOrderBy(isAsc ? "desc" : "asc");
  };
  const agregarReservaAVenta = async (reserva: ReservasClub) => {
    const reservaGenerada = await postAgregarReservaAVenta(reserva);
    if (reservaGenerada) {
      dispatch(setSuccess(reservaGenerada.descripcion));
      fetchReservasClub();
    }
  };

  return (
    <ContainerComponent>
      <Typography variant="h4" align="center" mb={3} fontWeight={600}>
        Panel de Reservas
      </Typography>

      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Button variant="contained" onClick={nuevoSocio}>
            Nueva Reserva
          </Button>
        </Grid>

        <Grid item display="flex" gap={2}>
          <TextField
            size="small"
            type="date"
            name="fechaDesde"
            id="fechaDesde"
            label="Fecha Desde"
            value={fechaDesde ? fechaDesde.toISOString().split("T")[0] : ""}
            onChange={(e) => setFechaDesde(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            size="small"
            type="date"
            name="fechaHasta"
            id="fechaHasta"
            label="Fecha Hasta"
            value={fechaHasta ? fechaHasta.toISOString().split("T")[0] : ""}
            onChange={(e) => setFechaHasta(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      {loadingReservas ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={handleSort}
                    style={{ cursor: "pointer", fontWeight: 600 }}
                  >
                    Nombre{" "}
                    {orderBy === "asc" ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Fecha de Agendamiento
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Hora Inicio
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Hora Fin
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Mesa
                  </TableCell>

                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Editar
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Eliminar
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Agrega a venta
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservas.map((reserva) => (
                  <TableRow
                    key={reserva.idMesa}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell>{reserva.nombreCmp}</TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(reserva.fechaAgendamiento)}
                    </TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(reserva.horaDesde)}
                    </TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(reserva.horaHasta)}
                    </TableCell>
                    <TableCell align="right">{reserva.idMesa}</TableCell>

                    <TableCell
                      onClick={() => editarReserva(reserva)}
                      align="right"
                    >
                      <EditOutlinedIcon sx={{ cursor: "pointer" }} />
                    </TableCell>
                    <TableCell
                      onClick={() => eliminarReserva(reserva.idClienteReserva)}
                      align="right"
                    >
                      <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
                    </TableCell>
                    <TableCell
                      onClick={() => agregarReservaAVenta(reserva)}
                      align="right"
                    >
                      <SellOutlinedIcon sx={{ cursor: "pointer" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" my={2}>
            <Pagination
              count={totalPaginas}
              page={page}
              onChange={handleChangePage}
              color="primary"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </Paper>
      )}
    </ContainerComponent>
  );
};

export default PanelReservas;
