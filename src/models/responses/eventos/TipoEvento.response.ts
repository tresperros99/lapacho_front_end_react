export interface TipoEventoResponse {
  status: boolean;
  msg: string;
  tiposEventos: TiposEvento[];
}

export interface TiposEvento {
  idTipoEvento: number;
  descTipoEvento: string;
}

export default TipoEventoResponse;
