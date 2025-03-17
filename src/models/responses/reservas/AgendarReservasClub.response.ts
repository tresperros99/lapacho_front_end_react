export interface AgendarReservaClubResponse {
  status: boolean;
  msg: string;
  reserva: Reserva;
}

export interface Reserva {
  idSocioReserva: number;
  nombreCmp: string;
  fechaAgendamiento: Date;
  fechaCreacion: Date;
  horaDesde: Date;
  horaHasta: Date;
  descMesa: string;
  idMesa: number;
}

export default AgendarReservaClubResponse;
