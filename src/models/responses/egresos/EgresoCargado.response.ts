export interface EgresoCargadoResponse {
    status:       boolean;
    msg:          string;
    nuevoIngreso: NuevoEgreso;
}

export interface NuevoEgreso {
    cargadoEn:   Date;
    idSocio:     number;
    monto:       number;
    idTipo:      number;
    descripcion: string;
}

export default EgresoCargadoResponse;