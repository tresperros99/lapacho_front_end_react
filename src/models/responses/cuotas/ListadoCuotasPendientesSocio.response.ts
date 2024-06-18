export interface ListadoCuotasPendientesSocio {
    status:        boolean;
    msj:           string;
    cuotasPagadas: CuotaPagada[];
}

export interface CuotaPagada {
    idCuotaSocio:     number;
    nombreSocio:      string;
    idSocio:          number;
    fechaVencimiento: Date;
    cuotaMes:         string;
    numeroMes:        string;
    cedula:           string;
    fechaPago:        Date | null;
    tipoCuota:        string;
    monto:            number;
}
