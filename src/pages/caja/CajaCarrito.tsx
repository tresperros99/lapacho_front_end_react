import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { postGenerarMovimientoDeVenta } from "../../api/ApiCaja";
import { getVentasClientes } from "../../api/ApiVentas";
import BuscadorSocios from "../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { separadorMiles } from "../../helpers/Numbers";
import GenerarMovimientoDeCajaVentaDto from "../../models/dtos/caja/generarMovimientoDeCajaVentaDto.model";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";
import { VentaServicio } from "../../models/responses/ventas/VentasClientes.response";
import PagoDeCuotas from "../socios/miSocio/PagoDeCuotas";
import { ModalFacturaVenta } from "./ModalFacturaVenta";
import FacturaTemplate, {
  FacturaPDFProps,
} from "../../components/genericos/Shared/FacturaTemplate";
import { pdf } from "@react-pdf/renderer";
import { ExpandMoreIcon } from "../../components/icons";

export const CajaCarrito = () => {
  const [page, setPage] = useState(1);
  const totalPaginas = 10;
  const cantidad = 10;
  const [selectdSocio, setSelectedSocio] = useState<Socio | null>(null);
  const [facturaData, setFacturaData] = useState<null | FacturaPDFProps>(null);

  const [movimientoCajaVenta, setMovimientoCajaVenta] =
    useState<GenerarMovimientoDeCajaVentaDto>({
      cedula: "",
      idCliente: 0,
      nroComprobante: "",
      nroFactura: "",
      nroTimbrado: 0,
      tipoPago: 0,
      ventas: [],
    });
  const [ventasClientes, setVentasClientes] = useState<VentaServicio[]>([]);
  const [modalFactura, setModalFactura] = useState(false);
  const [loadingGenerarVenta, setLoadingGenerarVenta] = useState(false);
  const handleSelectSocio = (socio: Socio | null) => {
    setSelectedSocio(socio);
  };
  const getVentas = async (
    page: number,
    cantidad: number,
    numeroCedula: string,
  ) => {
    const ventasClientesResp = await getVentasClientes(
      page,
      cantidad,
      numeroCedula,
    );

    if (ventasClientesResp) {
      const sortedVentasClientes = ventasClientesResp.ventaServicios.sort(
        (a, b) => {
          if (a.monto < b.monto) {
            return -1;
          }
          if (a.monto > b.monto) {
            return 1;
          }
          return Number(a.monto) - Number(b.monto);
        },
      );
      setVentasClientes(sortedVentasClientes);
    }
  };

  const handleCheckboxChange = (ventaServicio: VentaServicio) => {
    const isSelected = movimientoCajaVenta.ventas.some(
      (venta) => venta.idVenta === ventaServicio.idVenta,
    );

    if (isSelected) {
      setMovimientoCajaVenta({
        ...movimientoCajaVenta,
        ventas: movimientoCajaVenta.ventas.filter(
          (venta) => venta.idVenta !== ventaServicio.idVenta,
        ),
      });
    } else {
      setMovimientoCajaVenta({
        ...movimientoCajaVenta,
        idCliente: selectdSocio?.idCliente || 0,
        ventas: [...movimientoCajaVenta.ventas, ventaServicio],
      });
    }
  };
  const generarVenta = async () => {
    try {
      setLoadingGenerarVenta(true);
      const generarMovimiento =
        await postGenerarMovimientoDeVenta(movimientoCajaVenta);
      if (generarMovimiento && selectdSocio) {
        setFacturaData({
          timbrado: generarMovimiento.factura.timbrado,
          factura: generarMovimiento.factura.factura,
          detalleFactura: generarMovimiento.detalleFactura,
        });
      }
    } catch (error) {
      console.log("error al generar el movimiento de venta");
    } finally {
      setLoadingGenerarVenta(false);
    }
  };

  useEffect(() => {
    if (selectdSocio) {
      getVentas(page, cantidad, selectdSocio.cedula);
    }
  }, [selectdSocio, page]);

  useEffect(() => {
    if (
      movimientoCajaVenta.nroFactura.length > 0 &&
      movimientoCajaVenta.nroTimbrado !== 0 &&
      movimientoCajaVenta.ventas.length > 0
    ) {
      generarVenta();
    }
  }, [movimientoCajaVenta]);

  useEffect(() => {
    const descargarPDF = async () => {
      if (facturaData && selectdSocio) {
        const doc = <FacturaTemplate {...facturaData} />;
        const blob = await pdf(doc).toBlob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${selectdSocio.nombreSocio}_${movimientoCajaVenta.nroFactura}.pdf`;
        link.click();

        URL.revokeObjectURL(link.href);
        getVentas(page, cantidad, selectdSocio.cedula);
      }
    };

    descargarPDF();
  }, [facturaData, selectdSocio]);

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Ventas de los Clientes
      </Typography>
      {loadingGenerarVenta ? (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <CircularProgress size={50} />
        </Grid>
      ) : (
        <>
          <Grid container>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <BuscadorSocios onSelect={handleSelectSocio} />
              </Grid>
            </Grid>
          </Grid>
          {ventasClientes.length > 0 ? (
            <Grid item xs={12}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Operacion</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="right">Estado</TableCell>
                    <TableCell align="right">Pagar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ventasClientes.map((venta) => (
                    <TableRow
                      key={venta.idVenta}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {venta.descripcionVenta}
                      </TableCell>
                      <TableCell align="right">
                        {formatearFechaTipoDate(venta.fechaOperacion)}
                      </TableCell>
                      <TableCell align="right">
                        {separadorMiles(venta.monto, true)}
                      </TableCell>
                      <TableCell align="right">{venta.estado}</TableCell>
                      <TableCell align="right">
                        <Checkbox
                          checked={movimientoCajaVenta.ventas.some(
                            (v) => v.idVenta === venta.idVenta,
                          )}
                          onChange={() => handleCheckboxChange(venta)}
                          // disabled={!!socio.fechaPago} // Disable checkbox if cuota is already paid
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-start"
                mt={2}
                mb={2}
              >
                <Pagination
                  count={totalPaginas}
                  page={page}
                  onChange={(_event, value) => setPage(value)}
                  color="primary"
                />
              </Grid>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Seleccionar Cuotas Extras a Pagar</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PagoDeCuotas numeroCedula={selectdSocio?.cedula ?? ""} />
                </AccordionDetails>
              </Accordion>

              <Grid container item xs={12} justifyContent={"flex-end"} mt={2}>
                <Button
                  variant="contained"
                  onClick={() => setModalFactura(true)}
                >
                  Generar Movimiento
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} justifyContent={"center"} mt={8}>
              <Typography textAlign={"center"} color={"gray"}>
                Busque el Socio para ver sus cuotas Pendientes
              </Typography>
            </Grid>
          )}
        </>
      )}

      <ModalFacturaVenta
        open={modalFactura}
        handleClose={() => setModalFactura(false)}
        movimientoCajaVenta={movimientoCajaVenta}
        setMovimientoCajaVenta={setMovimientoCajaVenta}
      />
    </ContainerComponent>
  );
};

export default CajaCarrito;
