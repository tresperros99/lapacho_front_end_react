import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  EditOutlined as EditOutlinedIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClasesPorFecha, putCancelarClase } from "../../api/ApiClases";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CancelOutlinedIcon } from "../../components/icons";
import { setSuccess } from "../../features/ui/ui.slice";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { separadorMiles } from "../../helpers/Numbers";
import CancelarClaseDto from "../../models/dtos/clases/CancelarClaseDto.model";
import { ClasesDelDia } from "../../models/responses/clases/ClasesPorFecha.response";
import DialogConfirmacion from "../../components/genericos/Shared/DialogConfirmacion";

const PanelClases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [claseAEliminar, setClaseAEliminar] = useState<ClasesDelDia | null>(
    null,
  );
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const totalPaginas = 10;
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [clases, setClases] = useState<ClasesDelDia[]>([]);
  const [loadingClases, setLoadingClases] = useState(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const fetchReservasClub = useCallback(async () => {
    try {
      setLoadingClases(true);
      if (fechaDesde && fechaHasta) {
        const responseData = await getClasesPorFecha(
          fechaDesde,
          fechaHasta,
          page,
        );
        if (responseData) {
          setClases(responseData.clasesDelDia);
        }
      }
    } finally {
      setLoadingClases(false);
    }
  }, [fechaDesde, fechaHasta, page]);

  useEffect(() => {
    fetchReservasClub();
  }, [fetchReservasClub]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const editarClase = (clase: ClasesDelDia) => {
    navigate("/formClases", { state: clase });
  };

  const abrirDialogoConfirmacion = (clase: ClasesDelDia) => {
    setClaseAEliminar(clase);
    setConfirmDialogOpen(true);
  };

  const cerrarDialogoConfirmacion = () => {
    setClaseAEliminar(null);
    setConfirmDialogOpen(false);
  };
  const confirmarCancelacion = async () => {
    if (!claseAEliminar) return;
    try {
      setLoadingClases(true);
      const cancelarClaseDto: CancelarClaseDto = {
        idProfesor: claseAEliminar.idProfesor,
        fechaAgendamiento: formatearFechaTipoDate(claseAEliminar.fechaCreacion),
        inicio: claseAEliminar.horaDesde,
        fin: claseAEliminar.horaHasta,
        idMesa: claseAEliminar.idMesa,
        idAgendamiento: claseAEliminar.idAgendamiento,
        monto: claseAEliminar.montoAbonado,
      };
      const cancelarClaseResponse = await putCancelarClase(cancelarClaseDto);
      if (cancelarClaseResponse) {
        dispatch(
          setSuccess(
            cancelarClaseResponse.msg ?? "Clase cancelada exitosamente",
          ),
        );
        fetchReservasClub();
      }
    } finally {
      cerrarDialogoConfirmacion();
      setLoadingClases(false);
    }
  };

  const nuevoSocio = () => {
    navigate("/formReservas");
  };

  const handleSort = () => {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  return (
    <ContainerComponent>
      <Typography variant="h4" align="center" mb={3} fontWeight={600}>
        Panel de Clases
      </Typography>

      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Button variant="contained" onClick={nuevoSocio}>
            Crear Nueva Clase
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
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            size="small"
            type="date"
            name="fechaHasta"
            id="fechaHasta"
            label="Fecha Hasta"
            value={fechaHasta ? fechaHasta.toISOString().split("T")[0] : ""}
            onChange={(e) => setFechaHasta(new Date(e.target.value))}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {loadingClases ? (
        <Grid container justifyContent="center">
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
                    sx={{ cursor: "pointer", fontWeight: 600 }}
                  >
                    Profesor{" "}
                    {orderBy === "asc" ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
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
                    Monto a Abonar
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Alumno Actual
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Estado
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Editar
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Cancelar Clase
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clases.map((clase) => (
                  <TableRow key={clase.idAgendamiento} hover>
                    <TableCell>{clase.nombreProfesor}</TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(clase.horaDesde)}
                    </TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(clase.horaHasta)}
                    </TableCell>
                    <TableCell align="right">{clase.descMesa}</TableCell>
                    <TableCell align="right">
                      {separadorMiles(clase.montoAbonado, true)} Gs.
                    </TableCell>
                    <TableCell align="right">{clase.nombreCmp}</TableCell>
                    <TableCell align="right">
                      {clase.claseAgendada ? "Activa" : "Cancelada"}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => editarClase(clase)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => abrirDialogoConfirmacion(clase)}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
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
      <DialogConfirmacion
        open={confirmDialogOpen}
        onClose={cerrarDialogoConfirmacion}
        onConfirm={confirmarCancelacion}
        titulo="¿Cancelar clase?"
        descripcion="Esta acción es irreversible. ¿Estás seguro de cancelar esta clase?"
        textoCancelar="No, volver"
        textoConfirmar="Sí, cancelar"
      />
    </ContainerComponent>
  );
};

export default PanelClases;
