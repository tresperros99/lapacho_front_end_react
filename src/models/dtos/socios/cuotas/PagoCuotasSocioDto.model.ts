export interface PagoCuotasSocioDto {
    idSocio:         number;
    idCuotaSocio:    number[];
    numeroCedula:    string;
    nroFactura?:      string;
    descripcionPago?: string;
}
export default PagoCuotasSocioDto;