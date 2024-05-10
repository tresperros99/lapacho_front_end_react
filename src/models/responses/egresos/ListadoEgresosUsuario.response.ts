export interface ListadoEgresosUsuarioResponse {
    status:        boolean;
    msg:           string;
    egresosXFecha: EgresosXFecha[];
}

export interface EgresosXFecha {
    idOperacionEgreso:  number;
    idSocio:            number;
    nombreUsuario:      string;
    nombreCmp:          string;
    tiposIngreso:       string;
    comentario:         string;
    nroFactura:         string;
    monto:              number;
    fechaCarga:         Date;
    fechaActualizacion: Date;
}

export default ListadoEgresosUsuarioResponse;