import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  obtenerInscripcionesEvento,
  postAgregarInscripcionAVenta,
} from "../../../api/ApiEventos";
import { ContainerComponent } from "../../../components/genericos/ContainerComponent";
import { SellOutlinedIcon } from "../../../components/icons";
import { formatearFechaTipoDate } from "../../../helpers/fechas";
import { Inscripcion } from "../../../models/responses/eventos/InscripcionesEventos.response";
import { EventosMes } from "../../../models/responses/eventos/ObtenerEventosConCategorias.response";
import AgregarInscipcionAVentaDto from "../../../models/dtos/eventos/AgregarIncripcionAVentaDto.model";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../../features/ui/ui.slice";

const PanelInscripciones = () => {
  const location = useLocation();
  const eventoMes = location.state as EventosMes;
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const totalPaginas = 10;
  const [inscripcionesEventos, setInscripcionesEventeos] = useState<
    Inscripcion[]
  >([]);
  const [categoriaSeleccionada, setcategoriaSeleccionada] = useState(
    eventoMes.categoriasEvento[0],
  );
  const [loadingInscripciones, setLoadingInscripciones] = useState(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const fetchInscripcionesClub = useCallback(async () => {
    try {
      setLoadingInscripciones(true);
      if (eventoMes && categoriaSeleccionada && eventoMes.idEventoCalendario) {
        const responseData = await obtenerInscripcionesEvento(
          eventoMes.idEventoCalendario,
          categoriaSeleccionada.idCategoria,
        );
        if (responseData) {
          setInscripcionesEventeos(responseData.inscripciones);
        }
      }
    } finally {
      setLoadingInscripciones(false);
    }
  }, [eventoMes, categoriaSeleccionada]);

  useEffect(() => {
    fetchInscripcionesClub();
  }, [fetchInscripcionesClub]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSort = () => {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const agregarInscripcionAVenta = async (inscripcion: Inscripcion) => {
    try {
      setLoadingInscripciones(true);  
      const agregarInscripcionDto: AgregarInscipcionAVentaDto = {
        inscripciones: [
          {
            idSocioCuota: null,
            idReserva: null,
            idInscripcion: inscripcion.idInscripcion,
            monto: categoriaSeleccionada.costo,
            estado: false,
          },
        ],
      };
      const response = await postAgregarInscripcionAVenta(
        agregarInscripcionDto,
      );
      if (response) {
        dispatch(setSuccess("Inscripción agregada a la venta correctamente"));
        fetchInscripcionesClub();
      }
    } catch (error) {
      console.error("Error al agregar inscripción a la venta:", error);
    }
    finally {
      setLoadingInscripciones(false);
    }
  };

  return (
    <ContainerComponent>
      <Typography variant="h4" align="center" mb={3} fontWeight={600}>
        Panel de Inscripciones
      </Typography>

      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="year-select-label">{"Categorias"}</InputLabel>
            <Select
              sx={{ minWidth: 200, maxWidth: 300 }}
              label="Categorias"
              value={categoriaSeleccionada.idCategoria}
              onChange={() => setcategoriaSeleccionada(categoriaSeleccionada)}
            >
              {eventoMes.categoriasEvento.length > 0 ? (
                eventoMes.categoriasEvento.map((categoria, index) => (
                  <MenuItem
                    key={categoria.idCategoria + categoria.descripcion + index}
                    value={categoria.idCategoria}
                  >
                    {categoria.descripcion}
                  </MenuItem>
                ))
              ) : (
                <CircularProgress />
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loadingInscripciones ? (
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
                    Nombre{" "}
                    {orderBy === "asc" ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Evento
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Categoria
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Fecha Inscripcion
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Estado
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Agrega a venta
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inscripcionesEventos.map((inscripcion) => (
                  <TableRow key={inscripcion.idEventoCalendario} hover>
                    <TableCell>{inscripcion.nombre}</TableCell>
                    <TableCell align="right">
                      {inscripcion.descInscripcion}
                    </TableCell>
                    <TableCell align="right">
                      {inscripcion.nombreCategoria}
                    </TableCell>
                    <TableCell align="right">
                      {formatearFechaTipoDate(inscripcion.fechaInscripcion)}
                    </TableCell>
                    <TableCell align="right">{inscripcion.estado}</TableCell>
                    <TableCell
                      onClick={() => agregarInscripcionAVenta(inscripcion)}
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

export default PanelInscripciones;
