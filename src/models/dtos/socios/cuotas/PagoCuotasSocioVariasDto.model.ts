export interface PagoCuotaSociosVariasDto {
  cuotas: Cuota[];
}

export interface Cuota {
  idSocio: number;
  idCuotaSocio: number;
  numeroCedula: string;
  nroFactura?: string;
  descripcionPago?: string;
}

export default PagoCuotaSociosVariasDto;
