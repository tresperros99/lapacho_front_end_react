import { CircularProgress, Pagination, Typography } from "@mui/material";
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
import { getEventosConCategoria } from "../../api/ApiEventos";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import MonthSelector from "../../components/genericos/Shared/MonthSelector";
import YearSelector from "../../components/genericos/Shared/YearSelector";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { EventosMes } from "../../models/responses/eventos/ObtenerEventosConCategorias.response";

const PanelEventos = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const totalPaginas = 10;
  const fechaActual = new Date();
  const anioActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;
  const [mes, setMes] = useState<number>(mesActual);
  const [annio, setAnio] = useState<number>(anioActual);
  const [eventos, setEventos] = useState<EventosMes[]>([]);
  const [loadingEventos, setLoadingEventos] = useState(false);
  // const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const fetchEventosPorFecha = useCallback(async () => {
    try {
      setLoadingEventos(true);
      if (mes && annio) {
        const responseData = await getEventosConCategoria(mes, annio);
        if (responseData) {
          console.log(responseData);

          setEventos(responseData.eventosMes);
        }
      }
    } finally {
      setLoadingEventos(false);
    }
  }, [mes, annio]);

  useEffect(() => {
    fetchEventosPorFecha();
  }, [fetchEventosPorFecha]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleInscripcionEvento = (torneo: EventosMes) => {
    navigate("/inscripcionEvento", { state: torneo });
  };

  const handleVerInscriptosAEvento = (torneo: EventosMes) => {
    navigate("/panelInscripciones", { state: torneo });
  };

  // const editarReserva = (reserva: ReservasClub) => {
  //   navigate("/formReserva", { state: reserva });
  // };

  // const eliminarReserva = async (idReserva: number) => {
  //   const eliminado = await eliminarReservaDelClub(idReserva);
  //   if (eliminado && fechaDesde && fechaHasta) {
  //     await getReservasDelClub(fechaDesde, fechaHasta, page);
  //   }
  // };

  const nuevoEvento = () => {
    navigate("/formEventos");
  };

  // const handleSort = () => {
  //   const isAsc = orderBy === "asc";
  //   setOrderBy(isAsc ? "desc" : "asc");
  // };
  // const agregarReservaAVenta = async (reserva: ReservasClub) => {
  //   const reservaGenerada = await postAgregarReservaAVenta(reserva);
  //   if (reservaGenerada) {
  //     dispatch(setSuccess(reservaGenerada.descripcion));
  //     fetchEventosPorFecha();    }
  // };

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Panel de Eventos
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={nuevoEvento}>
          Nuevo Evento
        </Button>
      </Grid>
      <Grid container justifyContent={"center"} spacing={2} mb={2}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <YearSelector selectedYear={annio} onChange={setAnio} />
          </Grid>
          <Grid item xs={6}>
            <MonthSelector selectedMonth={mes} onChange={setMes} />
          </Grid>
        </Grid>
      </Grid>

      {loadingEventos ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
                  Nombre{" "}
                  {orderBy === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </TableCell> */}
                <TableCell align="left">Nombre Evento</TableCell>
                <TableCell align="left">Descripcion</TableCell>
                <TableCell align="left">Fecha de Creacion</TableCell>
                <TableCell align="left">Hora Desde</TableCell>
                <TableCell align="left">Hora Hasta</TableCell>
                <TableCell align="left">Todo El dia</TableCell>
                <TableCell align="left">Inscribir</TableCell>
                <TableCell align="left">Ver Inscriptos</TableCell>

                {/* <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Eliminar</TableCell>
                <TableCell align="right">Incripciones</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {eventos.map((torneo, index) => (
                <TableRow
                  key={torneo.idEventoCalendario + torneo.descripcion + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {torneo.nombreCmp}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {torneo.descripcion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {formatearFechaTipoDate(torneo.fechaCreacion)}
                  </TableCell>
                  <TableCell align="left">
                    {formatearFechaTipoDate(torneo.horaDesde)}
                  </TableCell>
                  <TableCell align="left">
                    {formatearFechaTipoDate(torneo.horaHasta)}
                  </TableCell>
                  <TableCell align="left">
                    {torneo.todoEldia ? "SI" : "NO"}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleInscripcionEvento(torneo)}
                    >
                      Inscribir
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleVerInscriptosAEvento(torneo)}
                    >
                      Ver
                    </Button>
                  </TableCell>

                  {/* <TableCell
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
                  </TableCell> */}
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

export default PanelEventos;
