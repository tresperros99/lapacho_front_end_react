export interface ObtenerAccesosResponse {
    status:             boolean;
    msj:                string;
    accesosDisponibles: AccesosDisponible[];
}

export interface AccesosDisponible {
    idRolUsuario:   number;
    descripcionRol: string;
}

export default ObtenerAccesosResponse;
