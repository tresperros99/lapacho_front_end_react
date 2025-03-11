export interface VentasClientesResponse {
  status: boolean;
  msg: string;
  ventaServicios: VentaServicio[];
}

export interface VentaServicio {
  idVenta: number;
  idCliente: null;
  idSocioCuota: number;
  idReserva: null;
  idClase: null;
  idInscripcion: null;
  descripcionVenta: string;
  tipoServicio: number;
  nroCedula: null;
  fechaOperacion: Date;
  monto: number;
  estado: string;
}

export default VentasClientesResponse;
