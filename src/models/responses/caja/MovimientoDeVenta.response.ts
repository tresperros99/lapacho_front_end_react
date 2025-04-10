export interface MovimientoDeVentaResponse {
  status: boolean;
  msg: string;
  descripcion: string;
  factura: MovimientoDeVentaResponseFactura;
  detalleFactura: DetalleFactura[];
}

export interface DetalleFactura {
  cantidad: number;
  descripcion: string;
  precio: number;
  iva10: number;
}

export interface MovimientoDeVentaResponseFactura {
  timbrado: Timbrado;
  factura: FacturaFactura;
}

export interface FacturaFactura {
  nroFactura: string;
  totalIva: number;
  montoTotal: number;
  fechaEmision: string;
}

export interface Timbrado {
  nroTimbrado: number;
  fechaVencimiento: Date;
  rucEmisor: string;
  razonSocial: string;
  direccion: null;
}

export default MovimientoDeVentaResponse;
