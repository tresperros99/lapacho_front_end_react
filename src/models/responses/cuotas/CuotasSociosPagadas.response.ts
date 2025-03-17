export interface CuotasSociosPagadasResponse {
  status: boolean;
  msj: string;
  pagoCuotas: PagoCuota[];
}

export interface PagoCuota {
  idCuotaSocio: number;
  nombreSocio: string;
  idSocio: number;
  fechaVencimiento: Date;
  cuotaMes: string;
  numeroMes: string;
  cedula: string;
  fechaPago: Date;
  monto: number;
}

export default CuotasSociosPagadasResponse;
