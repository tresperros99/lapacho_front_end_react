export interface LoginResponse {
    status: boolean;
    msj:    string;
    token:  string;
    acceso: Acceso;
}

export interface Acceso {
    tipoUsuario:       string;
    descripcionAcceso: string;
}

export default LoginResponse;