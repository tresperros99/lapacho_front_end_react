import {
  CircularProgress,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNominaSocios, putEliminarSocio } from "../../api/ApiSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  DeleteOutlineOutlinedIcon,
  EditOutlinedIcon,
} from "../../components/icons";
import { setSuccess } from "../../features/ui/ui.slice";
import { separadorMiles } from "../../helpers/Numbers";
import es from "../../locales/es";
import { Socio } from "../../models/responses/socios/NominaSocios.response";

const PanelSocios = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [nominaSocios, setNominaSocios] = useState<Socio[]>([]);
  const [loadingSocios, setLoadingSocios] = useState(false);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const isMounted = true;
    const fetchNominaDeSocios = async () => {
      try {
        setLoadingSocios(true);
        if (isMounted) {
          const responseData = await getNominaSocios();
          if (responseData) {
            setNominaSocios(responseData.socios);
          }
        }
      } finally {
        setLoadingSocios(false);
      }
    };
    if (nominaSocios.length === 0 && !loadingSocios) {
      fetchNominaDeSocios();
    }
  }, [nominaSocios.length, loadingSocios]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editarSocio = (socio: Socio) => {
    navigate("/formSocios", { state: socio });
  };

  const eliminarSocioById = async (idSocio: number) => {
    try {
      setLoadingSocios(true);
      const eliminarSocioResp = await putEliminarSocio(idSocio);
      if (eliminarSocioResp) {
        dispatch(setSuccess(eliminarSocioResp.msg));
      }
    } finally {
      setLoadingSocios(false);
    }
  };

  const nuevoSocio = () => {
    navigate("/formSocios");
  };

  const handleSort = () => {
    const isAsc = orderBy === "asc";
    setOrderBy(isAsc ? "desc" : "asc");
  };

  const sortedSocios = [...nominaSocios].sort((a, b) => {
    if (orderBy === "asc") {
      return a.nombreSocio.localeCompare(b.nombreSocio);
    }
    return b.nombreSocio.localeCompare(a.nombreSocio);
  });

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        {es.pages.socios.panel.title}
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={nuevoSocio}>
          {es.common.buttons.new}
        </Button>
      </Grid>
      {sortedSocios.length === 0 && loadingSocios ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
                  {es.pages.socios.panel.tableHeaders.name}{" "}
                  {orderBy === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </TableCell>
                <TableCell align="right">
                  {es.pages.socios.panel.tableHeaders.id}
                </TableCell>
                <TableCell align="right">
                  {es.pages.socios.panel.tableHeaders.status}
                </TableCell>
                <TableCell align="right">
                  {es.pages.socios.panel.tableHeaders.phone}
                </TableCell>
                <TableCell align="right">
                  {es.pages.socios.panel.tableHeaders.description}
                </TableCell>

                <TableCell align="right">
                  {es.pages.socios.panel.tableHeaders.edit}
                </TableCell>
                <TableCell align="right">
                  {es.pages.socios.panel.tableHeaders.delete}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSocios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((socio) => (
                  <TableRow
                    key={socio.idCliente}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {socio.nombreSocio}
                    </TableCell>
                    <TableCell align="right">
                      {separadorMiles(socio.cedula, true)}
                    </TableCell>
                    <TableCell align="right">{socio.estadoSocio}</TableCell>
                    <TableCell align="right">{socio.numeroTelefono}</TableCell>
                    <TableCell align="right">{socio.descTipoSocio}</TableCell>

                    <TableCell onClick={() => editarSocio(socio)} align="right">
                      <EditOutlinedIcon sx={{ cursor: "pointer" }} />
                    </TableCell>
                    <TableCell
                      onClick={() => eliminarSocioById(socio.idCliente)}
                      align="right"
                    >
                      <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={nominaSocios.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={es.common.pagination.rowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${es.common.pagination.of} ${count}`
                }
              />
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </ContainerComponent>
  );
};

export default PanelSocios;
