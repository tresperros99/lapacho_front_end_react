export interface ReservasClubResponse {
  reservas: boolean;
  msg: string;
  reservasClub: ReservasClub[];
}

export interface ReservasClub {
  idClienteReserva: number;
  nombreCmp: string;
  fechaAgendamiento: Date;
  fechaCreacion: Date;
  horaDesde: Date;
  horaHasta: Date;
  descMesa: string;
  idMesa: number;
}

export default ReservasClubResponse;
