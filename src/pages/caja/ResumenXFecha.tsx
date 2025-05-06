import {
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { obtenerResumenXFecha } from "../../api/ApiCaja";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { MovimientosDeCaja } from "../../models/responses/caja/ResumenCajaXFecha";
import ResumenCaja from "./ResumenCaja";

const ResumenXFecha = () => {
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);
  const [loadingResumen, setLoadingResumen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [movimientosDeCaja, setMovientosDeCaja] = useState<MovimientosDeCaja[]>(
    [],
  );
  const handlePageChange = (
    _event: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); 
  };
  const fetchResumenXFecha = useCallback(async () => {
    try {
      setLoadingResumen(true);
      if (fechaDesde && fechaHasta) {
        const responseData = await obtenerResumenXFecha(fechaDesde, fechaHasta);
        if (responseData) {
          console.log(responseData);

          setMovientosDeCaja(responseData.movimientos_de_caja);
          setTotalCount(100);
        }
      }
    } finally {
      setLoadingResumen(false);
    }
  }, [fechaDesde, fechaHasta,]);

  useEffect(() => {
    fetchResumenXFecha();
  }, [fetchResumenXFecha]);
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Resumen de caja por fecha
      </Typography>

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
    <ResumenCaja loadingResumen={loadingResumen} movimientosDeCaja={movimientosDeCaja}       page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}/>
    </ContainerComponent>
  );
};

export default ResumenXFecha;
