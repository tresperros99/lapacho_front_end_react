export interface CuotasPendiente {
  idCuotaSocio: number;
  nombreSocio: string;
  idSocio: number;
  fechaVencimiento: Date;
  cuotaMes: string;
  numeroMes: string;
  cedula: string;
  fechaPago: null;
  tipoCuota: string;
}

export default CuotasPendiente;
