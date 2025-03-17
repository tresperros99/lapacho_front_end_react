export interface CrearEventoResponse {
  status: boolean;
  msg: string;
  nuevoEvento: NuevoEvento;
}

export interface NuevoEvento {
  idEventoCalendario: number;
  nombreCmp: string;
  fechaAgendamiento: Date;
  fechaCreacion: Date;
  horaDesde: Date;
  horaHasta: Date;
  descripcion: string;
  costo: number;
  idTipoEvento: number;
  todoEldia: boolean;
}

export default CrearEventoResponse;
