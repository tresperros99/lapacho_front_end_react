export interface TipoEgresoResponse {
  status: boolean;
  msg: string;
  tiposEgreso: TiposEgreso[];
}

export interface TiposEgreso {
  descripcion: string;
  idTipo: number;
}

export default TipoEgresoResponse;
