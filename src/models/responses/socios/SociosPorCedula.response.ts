export interface SocioPorCedulaResponse {
    status: boolean;
    msg:    string;
    socio:  Socio[];
}

export interface Socio {
    idSocio:        string;
    tipoSocio:      string;
    numeroTel:      string;
    nombreUsuario:  string;
    contraseña:     string;
    estadoSocio:    number;
    direccionSocio: null;
}
