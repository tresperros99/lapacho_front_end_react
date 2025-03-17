export interface EventosDelMesResponse {
  status: boolean;
  msg: string;
  eventosMes: EventsMes[];
}

export interface EventsMes {
  fechaDesde: Date;
  fechaHasta: Date;
  descripcion: string;
  costo: number;
  idTipoEvento: number;
  idEventoCalendario: number;
  todoEldia: boolean;
  nombreEvento: string;
}

export default EventosDelMesResponse;
