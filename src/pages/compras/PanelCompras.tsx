import {
  Box,
  CircularProgress,
  Pagination,
  Typography
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
import { getComprasDelClub } from "../../api/ApiCompras";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  DeleteOutlineOutlinedIcon,
  EditOutlinedIcon
} from "../../components/icons";
import { FETCH_CONSTANS } from "../../helpers/constants";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { separadorMiles } from "../../helpers/Numbers";
import { Compra } from "../../models/responses/compras/ObtenerComprasClub.response";

const PanelCompras = () => {
  const navigate = useNavigate();
  const {PAGINA,CANTIDAD} = FETCH_CONSTANS
  const totalPaginas = 10;
  const [page, setPage] = useState(PAGINA);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [loadingComprasClub, setLoadingComprasClub] = useState(false);
  const [compras, setCompras] = useState<Compra[]>([])
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const editarCompra = (compra: Compra) => {
    navigate("/formCompra", { state: compra });
  };

  // const eliminarCompra = async (idReserva: number) => {
  //   const eliminado = await eliminarReservaDelClub(idReserva);
  //   // if (eliminado && fechaDesde && fechaHasta) {
  //   //   await getReservasDelClub(fechaDesde, fechaHasta, page);
  //   // }
  // };

  const nuevaCompra = () => {
    navigate("/formCompras");
  };

  const handleSort = () => {
    const isAsc = orderBy === "asc";
    setOrderBy(isAsc ? "desc" : "asc");
  };






  const fetchComprasDelClub = useCallback(async () => {
    try {
      setLoadingComprasClub(true);
     
        const comprasClubResponse = await getComprasDelClub(
          page,
          CANTIDAD,
        );
        if (comprasClubResponse) {
          setCompras(comprasClubResponse.compras);
        }
      
    } finally {
      setLoadingComprasClub(false);
    }
  }, [page,CANTIDAD]);

  useEffect(() => {
    fetchComprasDelClub();
  }, [fetchComprasDelClub]);
  


  return (
    <ContainerComponent>
      <Typography variant="h4" align="center" mb={3} fontWeight={600}>
        Panel de Compras
      </Typography>
      <Grid container justifyContent={"flex-end"} mb={2}>
        <Grid item>
          <Button variant="contained" onClick={nuevaCompra}>
            Nueva Compra
          </Button>
        </Grid>
      </Grid>

      {loadingComprasClub ? (
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
                    Descripcion
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Cantidad
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                   Fecha de Creacion
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    estado
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Editar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {compras.map((compra) => (
                  <TableRow
                    key={compra.idCompra}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell>{compra.descripcion}</TableCell>
                    <TableCell align="right">
                      {separadorMiles(compra.cantidad,true)}
                    </TableCell>
                    <TableCell align="right">
                      {compra.fechaCreacion? formatearFechaTipoDate(compra.fechaCreacion): "no disponible"}
                    </TableCell>
                    <TableCell align="right">
                      {compra.estado}
                    </TableCell>

                    <TableCell
                      onClick={() => editarCompra(compra)}
                      align="right"
                    >
                      <EditOutlinedIcon sx={{ cursor: "pointer" }} />
                    </TableCell>
                    <TableCell
                      onClick={() => editarCompra(compra)}
                      align="right"
                    >
                      <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />
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

export default PanelCompras;
