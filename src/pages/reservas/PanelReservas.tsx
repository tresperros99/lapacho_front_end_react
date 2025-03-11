import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import {
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
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const fetchReservasClub = async () => {
      try {
        setLoadingReservas(true);
        if (fechaDesde && fechaHasta) {
          const responseData = await getReservasDelClub(
            fechaDesde,
            fechaHasta,
            page
          );
          if (responseData) {
            setReservas(responseData.reservasClub);
          }
        }
      } finally {
        setLoadingReservas(false);
      }
    };

    fetchReservasClub();
  }, [fechaDesde, fechaHasta, page]);

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
    }
  };

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Panel de Reservas
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={nuevoSocio}>
          Nueva Reserva
        </Button>
      </Grid>
      <Grid container justifyContent={"center"} spacing={2} mb={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="fechaDesde"
            name="fechaDesde"
            label="Fecha Desde"
            type="date"
            value={fechaDesde ? fechaDesde.toISOString().split("T")[0] : ""}
            onChange={(e) => setFechaDesde(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="fechaHasta"
            name="fechaHasta"
            label="Fecha Hasta"
            type="date"
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
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
                  Nombre{" "}
                  {orderBy === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </TableCell>
                <TableCell align="right">Fecha de Agendamiento</TableCell>
                <TableCell align="right">Hora Inicio</TableCell>
                <TableCell align="right">Hora Fin</TableCell>
                <TableCell align="right">Mesa</TableCell>

                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Eliminar</TableCell>
                <TableCell align="right">Agrega a venta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow
                  key={reserva.idMesa}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {reserva.nombreCmp}
                  </TableCell>
                  <TableCell component="th" scope="row">
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
            <Grid container>
              <Pagination
                sx={{
                  "& .MuiPagination-ul": {
                    flexWrap: "nowrap", // Evita que las páginas se ajusten en múltiples filas
                  },
                }}
                count={totalPaginas}
                page={page}
                onChange={handleChangePage}
                color="primary"
                siblingCount={1} // Controla cuántas páginas muestra al lado de la página actual
                boundaryCount={1}
              />
            </Grid>
          </Table>
        </TableContainer>
      )}
    </ContainerComponent>
  );
};

export default PanelReservas;
