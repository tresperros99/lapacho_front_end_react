export interface PagarCuotaPendienteSocioDto {
    idSocio:         number;
    idCuotaSocio:    number;
    numeroCedula:    string;
    nroFactura?:     string;
    montoAbonado:    number;
    descripcionPago: string;
}

export default PagarCuotaPendienteSocioDto;