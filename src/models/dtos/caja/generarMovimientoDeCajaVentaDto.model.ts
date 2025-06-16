import { VentaServicio } from "../../responses/ventas/VentasClientes.response";

export interface GenerarMovimientoDeCajaVentaDto {
  nroFactura: string;
  nroTimbrado: number;
  idCliente: number;
  cedula: string;
  tipoPago: number;
  nroComprobante: string;
  ventas: VentaServicio[];
  comprobanteFile?: File,
}

export default GenerarMovimientoDeCajaVentaDto;
