export interface TipoEgresoResponse {
  status: boolean;
  msg: string;
  tiposEgreso: TiposEgreso[];
}

export interface TiposEgreso {
  descripcion: string;
  idTipoEgreso: number;
}

export default TipoEgresoResponse;
