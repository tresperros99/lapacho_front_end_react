export interface GenerarVentaCuotasVariasDto {
  cliente: string;
  cuotas: Cuota[];
}

export interface Cuota {
  idSocioCuota: number;
  idReserva: null;
  idInscripcion: null;
  monto: number;
  estado: boolean;
}

export default GenerarVentaCuotasVariasDto;
