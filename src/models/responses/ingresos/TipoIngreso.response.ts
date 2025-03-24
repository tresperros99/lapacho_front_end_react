export interface TipoIngresoResponse {
  status: boolean;
  msg: string;
  tiposIngreso: TiposIngreso[];
}

export interface TiposIngreso {
  descripcion: string;
  idTipo: number;
}

export default TipoIngresoResponse;
