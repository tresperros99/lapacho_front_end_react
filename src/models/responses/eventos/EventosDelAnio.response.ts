export interface EventosDeAnioResponse {
  status: boolean;
  msg: string;
  cantidadRegistros: number;
  eventosDelMes: EventosDelMe[];
}

export interface EventosDelMe {
  idEventoCalendario: number;
  descEvento: string;
  costoInscripcion: number;
  fechainicio: Date;
  fechaFin: Date;
}

export default EventosDeAnioResponse;
