export interface ListadoCuotasPagadasSocio {
    status:        boolean;
    msj:           string;
    cuotasPagadas: CuotasPagada[];
}

export interface CuotasPagada {
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
