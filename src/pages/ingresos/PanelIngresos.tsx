import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Button,
  Grid,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
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
  getExcelIngresos,
  getListadoIngresosUsuarios,
} from "../../api/ApiIngresos";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { separadorMiles } from "../../helpers/Numbers";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { IngresosXFecha } from "../../models/responses/ingresos/ListadoingresosUsuario.response";

const PanelIngresos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [listadoIngresos, setListadoIngresos] = useState<IngresosXFecha[]>([]);
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [orderBy, setOrderBy] = useState<{
    column: string;
    direction: "asc" | "desc";
  }>({ column: "tiposIngreso", direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    if (fechaHasta !== null) {
      fetchData();
    }
  }, [page, fechaHasta, orderBy]);

  const fetchData = async () => {
    try {
      const response = await getListadoIngresosUsuarios(
        fechaDesde ? formatearFechaTipoDate(fechaDesde) : "",
        fechaHasta ? formatearFechaTipoDate(fechaHasta) : "",
        (page + 1).toString(),
      );
      if (response) {
        const sortedData = [...response.ingresosXFecha].sort((a, b) => {
          if (orderBy.column === "tiposIngreso") {
            return orderBy.direction === "asc"
              ? a.tiposIngreso.localeCompare(b.tiposIngreso)
              : b.tiposIngreso.localeCompare(a.tiposIngreso);
          }
          return 0;
        });
        setListadoIngresos(sortedData);
      }
    } catch (error) {
      console.error("Error al obtener los ingresos:", error);
    }
  };

  const handleDescargarPdf = async () => {
    if (fechaDesde && fechaHasta) {
      const fechaDesdeFormateada = formatearFechaTipoDate(fechaDesde);
      const fechaHastaFormateada = formatearFechaTipoDate(fechaHasta);
      const getPDF = await getExcelIngresos(
        fechaDesdeFormateada,
        fechaHastaFormateada,
      );
      if (getPDF) {
        const fileURL = URL.createObjectURL(new Blob([getPDF]));
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute(
          "download",
          `reporte_${fechaDesdeFormateada}_${fechaHastaFormateada}_.xls`,
        );
        document.body.appendChild(link);
        link.click();
      }
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFechaDesdeChange = (date: Date | null) => {
    setFechaDesde(date);
  };

  const handleFechaHastaChange = (date: Date | null) => {
    setFechaHasta(date);
  };

  const handleSort = (column: string) => {
    const isAsc = orderBy.column === column && orderBy.direction === "asc";
    setOrderBy({ column, direction: isAsc ? "desc" : "asc" });
  };

  const nuevoIngreso = () => {
    navigate("/ingresos");
  };

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Panel de Ingresos
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="fechaDesde"
            name="fechaDesde"
            label="Fecha Desde"
            type="date"
            value={fechaDesde ? fechaDesde.toISOString().split("T")[0] : ""}
            onChange={(e) => handleFechaDesdeChange(new Date(e.target.value))}
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
            onChange={(e) => handleFechaHastaChange(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid container item xs={12} justifyContent={`flex-end`} spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDescargarPdf}
              disabled={!fechaDesde || !fechaHasta}
            >
              Descargar Excel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={nuevoIngreso}>
              Agregar Ingreso
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("tiposIngreso")}
                style={{ cursor: "pointer" }}
              >
                Ingreso{" "}
                {orderBy.column === "tiposIngreso" &&
                  (orderBy.direction === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  ))}
              </TableCell>
              <TableCell align="right">Socio</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listadoIngresos.map((ingreso) => (
              <TableRow key={ingreso.idOperacionIngreso}>
                <TableCell component="th" scope="row">
                  {ingreso.tiposIngreso}
                </TableCell>
                <TableCell align="right">{ingreso.nombreCmp}</TableCell>
                <TableCell align="right">{ingreso.comentario}</TableCell>
                <TableCell align="right">
                  {separadorMiles(ingreso.monto, true)}
                </TableCell>
                <TableCell align="right">
                  {formatearFechaTipoDate(ingreso.fechaCarga)}
                </TableCell>
                <TableCell align="right">
                  {/* Botones de edición y eliminación */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={listadoIngresos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ContainerComponent>
  );
};

export default PanelIngresos;
