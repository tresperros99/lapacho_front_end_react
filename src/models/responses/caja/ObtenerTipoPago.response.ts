export interface ObtenerTipoPagoResponse {
  status: boolean;
  msg: string;
  tiposPago: TiposPago[];
}

export interface TiposPago {
  idTipoPago: number;
  descTipoPago: string;
}

export default ObtenerTipoPagoResponse;
