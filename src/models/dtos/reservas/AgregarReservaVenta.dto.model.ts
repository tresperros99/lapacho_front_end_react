export interface AgregarReservaAVentaDto {
  reservas: Reserva[];
}

export interface Reserva {
  idSocioCuota: null;
  idReserva: number;
  idInscripcion: null;
  monto: number;
  estado: boolean;
}

export default AgregarReservaAVentaDto;
