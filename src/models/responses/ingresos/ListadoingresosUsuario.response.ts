export interface ListadoIngresosUsuarioResponse {
    status:         boolean;
    msj:            string;
    ingresosXFecha: IngresosXFecha[];
}

export interface IngresosXFecha {
    idOperacionIngreso: number;
    idSocio:            number;
    nombreUsuario:      string;
    nombreCmp:          string;
    tiposIngreso:       string;
    comentario:         string;
    monto:              number;
    fechaCarga:         Date;
    fechaActualizacion: Date;
}

export default ListadoIngresosUsuarioResponse;