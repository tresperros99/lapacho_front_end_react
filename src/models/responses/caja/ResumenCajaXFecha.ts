export interface ResumenCajaXFecharesponse {
    status:              boolean;
    msg:                 string;
    movimientos_de_caja: MovimientosDeCaja[];
}

export interface MovimientosDeCaja {
    nroComprobante:  string;
    tipoComprobante: string;
    tipoOperacion:   string;
    monto:           number;
    fechaEmision:    string;
}

export default ResumenCajaXFecharesponse