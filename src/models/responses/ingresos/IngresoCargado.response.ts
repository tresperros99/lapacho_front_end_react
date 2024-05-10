export interface IngresoCargadoResponse {
    status:       boolean;
    msg:          string;
    nuevoIngreso: NuevoIngreso;
}

export interface NuevoIngreso {
    cargadoEn:   Date;
    idSocio:     number;
    monto:       number;
    idTipo:      number;
    descripcion: string;
}

export default IngresoCargadoResponse;