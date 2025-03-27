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
  getExcelEgresos,
  getListadoEgresosUsuarios,
} from "../../api/ApiEgresos";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { EgresosXFecha } from "../../models/responses/egresos/ListadoEgresosUsuario.response";
import { separadorMiles } from "../../helpers/Numbers";
import { ArrowDropUpIcon, ArrowDropDownIcon } from "../../components/icons";

const PanelEgresos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [listadoEgresos, setListadoEgresos] = useState<EgresosXFecha[]>([]);
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [orderBy, setOrderBy] = useState<{
    column: string;
    direction: "asc" | "desc";
  }>({ column: "tipoEgreso", direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    if (fechaHasta !== null) {
      fetchData();
    }
  }, [page, fechaHasta, orderBy]);

  const fetchData = async () => {
    try {
      const response = await getListadoEgresosUsuarios(
        fechaDesde ? formatearFechaTipoDate(fechaDesde) : "",
        fechaHasta ? formatearFechaTipoDate(fechaHasta) : "",
        (page + 1).toString(),
      );
      if (response) {
        const sortedData = [...response.egresosXFecha].sort((a, b) => {
          if (orderBy.column === "tipoEgreso") {
            return orderBy.direction === "asc"
              ? a.tipoEgreso.localeCompare(b.tipoEgreso)
              : b.tipoEgreso.localeCompare(a.tipoEgreso);
          }
          return 0;
        });
        setListadoEgresos(sortedData);
      }
    } catch (error) {
      console.error("Error al obtener los egresos:", error);
    }
  };

  const handleDescargarPdf = async () => {
    if (fechaDesde && fechaHasta) {
      const fechaDesdeFormateada = formatearFechaTipoDate(fechaDesde);
      const fechaHastaFormateada = formatearFechaTipoDate(fechaHasta);
      const getPDF = await getExcelEgresos(
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

  const nuevoEgreso = () => {
    navigate("/egresos");
  };

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Panel de Egresos
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
        <Grid container item xs={12} justifyContent={`flex-end`}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDescargarPdf}
            disabled={!fechaDesde || !fechaHasta}
          >
            Descargar Egresos
          </Button>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={nuevoEgreso}>
            Agregar Egreso
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("tipoEgreso")}
                style={{ cursor: "pointer" }}
              >
                Egreso{" "}
                {orderBy.column === "tipoEgreso" &&
                  (orderBy.direction === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  ))}
              </TableCell>
              <TableCell align="right">Socio</TableCell>
              <TableCell align="right">Descripción</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listadoEgresos.map((egreso) => (
              <TableRow key={egreso.idOperacionEgreso}>
                <TableCell component="th" scope="row">
                  {egreso.tipoEgreso}
                </TableCell>
                <TableCell align="right">{egreso.nombreCmp}</TableCell>
                <TableCell align="right">{egreso.comentario}</TableCell>
                <TableCell align="right">
                  {separadorMiles(egreso.monto, true)}
                </TableCell>
                <TableCell align="right">
                  {formatearFechaTipoDate(egreso.fechaCarga)}
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
                count={listadoEgresos.length}
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

export default PanelEgresos;
