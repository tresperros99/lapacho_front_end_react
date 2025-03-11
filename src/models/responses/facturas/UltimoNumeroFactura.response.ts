export interface UltimoNumeroFacturaResponse {
  status: boolean;
  msg: string;
  factura: Factura;
}

export interface Factura {
  nroFactura: string;
  timbrado: number;
}

export default UltimoNumeroFacturaResponse;
