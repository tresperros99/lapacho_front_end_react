import { CircularProgress, Pagination, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
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
  eliminarProfesorClub,
  getProfesoresClub,
} from "../../api/ApiProfesores";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { es } from "../../locales/es";
import { ProfesoresFormateado } from "../../models/responses/profesores/NominaProfesores.response";
import {
  ArrowDropUpIcon,
  ArrowDropDownIcon,
  EditOutlinedIcon,
  DeleteOutlineOutlinedIcon,
} from "../../components/icons";
const PanelProfesores = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(true);
  const cantidadPorPagina = 10;
  const totalPaginas = 10;
  const [profesores, setProfesores] = useState<ProfesoresFormateado[]>([]);
  const [loadingProfesores, setLoadingProfesores] = useState(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (reload) {
      const fetchNominaProfesores = async () => {
        try {
          setLoadingProfesores(true);
          const responseData = await getProfesoresClub(cantidadPorPagina, 0);
          if (responseData) {
            setProfesores(responseData.profesoresFormateado);
          }
        } finally {
          setLoadingProfesores(false);
        }
      };

      fetchNominaProfesores();
    }
    setReload(false);
  }, [reload]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const editarPorfesor = (profesor: ProfesoresFormateado) => {
    navigate("/formProfesor", { state: profesor });
  };

  const eliminarProfesor = async (idProfesor: number) => {
    const eliminado = await eliminarProfesorClub(idProfesor);
    if (eliminado) {
      setReload(true);
    }
  };

  const nuevoProfesor = () => {
    navigate("/formProfesor");
  };

  const handleSort = () => {
    const isAsc = orderBy === "asc";
    setOrderBy(isAsc ? "desc" : "asc");
  };

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        {es.pages.profesores.panel.title}
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={nuevoProfesor}>
          {es.pages.profesores.panel.buttons.new}
        </Button>
      </Grid>

      {loadingProfesores ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
                  {es.pages.profesores.panel.tableHeaders.name}{" "}
                  {orderBy === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </TableCell>
                <TableCell align="right">
                  {es.pages.profesores.panel.tableHeaders.documentId}
                </TableCell>
                <TableCell align="right">
                  {es.pages.profesores.panel.tableHeaders.contact}
                </TableCell>
                <TableCell align="right">
                  {es.pages.profesores.panel.tableHeaders.hourlyRate}
                </TableCell>
                <TableCell align="right">
                  {es.pages.profesores.panel.tableHeaders.status}
                </TableCell>

                <TableCell align="right">
                  {es.pages.profesores.panel.tableHeaders.edit}
                </TableCell>
                <TableCell align="right">
                  {es.pages.profesores.panel.tableHeaders.delete}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profesores.map((profesor) => (
                <TableRow
                  key={profesor.cedula}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {" "}
                  <TableCell component="th" scope="row">
                    {profesor.nombreProfesor}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesor.cedula}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesor.contactoProfesor}
                  </TableCell>
                  <TableCell align="right">{profesor.costoXHora}</TableCell>
                  <TableCell align="right">{profesor.estadoProfesor}</TableCell>
                  <TableCell
                    onClick={() => editarPorfesor(profesor)}
                    align="right"
                  >
                    <EditOutlinedIcon sx={{ cursor: "pointer" }} />
                  </TableCell>
                  <TableCell
                    onClick={() => eliminarProfesor(profesor.idProfesor)}
                    align="right"
                  >
                    <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Grid container>
              <Pagination
                sx={{
                  "& .MuiPagination-ul": {
                    flexWrap: "nowrap",
                  },
                }}
                count={totalPaginas}
                page={page}
                onChange={handleChangePage}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
              />
            </Grid>
          </Table>
        </TableContainer>
      )}
    </ContainerComponent>
  );
};

export default PanelProfesores;
