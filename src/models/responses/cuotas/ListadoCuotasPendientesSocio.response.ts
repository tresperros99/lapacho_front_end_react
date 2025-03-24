export interface ListadoCuotasPendientesSocio {
  status: boolean;
  msj: string;
  cuotas: Cuota[];
}

export interface Cuota {
  idCuotaSocio: number;
  nombresocio: string;
  idsocio: number;
  cedula: string;
  cuotaMes: string;
  numeroMEs: string;
  fechaVencimiento: Date;
  fechaPago: null;
  montoCuota: number;
}
