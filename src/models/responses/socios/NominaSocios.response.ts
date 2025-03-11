export interface NomiSociosResponse {
    status: boolean;
    msg:    string;
    socios: Socio[];
}

export interface Socio {
    nombreSocio:       string;
    cedula:            string;
    correoElectronico: string;
    direccion:         string;
    idCliente:         number;
    ruc:               string;
    creadoEn:          Date;
    nombreUsuario:     string;
    fechaNacimiento:   Date;
    idTipoSocio:       number;
    descTipoSocio:     string;
    numeroTelefono:    string;
    estadoSocio:       string;
}


export default NomiSociosResponse;