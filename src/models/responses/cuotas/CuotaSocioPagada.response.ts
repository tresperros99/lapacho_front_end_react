export interface CuotaPagadaResponse {
    status:              boolean;
    msj:                 string;
    pagoSocioConvertido: PagoSocioConvertido;
}

export interface PagoSocioConvertido {
    fechaPago:    Date;
    nombreSocio:  string;
    montoAbonado: number;
    nroFactura:   string;
}

export default CuotaPagadaResponse;