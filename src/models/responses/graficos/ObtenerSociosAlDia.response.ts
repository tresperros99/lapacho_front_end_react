export interface ObtenerSociosAlDiaResponse {
    status:  boolean;
    msg:     string;
    estados: Estado[];
}

export interface Estado {
    estado:   string;
    cantidad: number;
}

export default ObtenerSociosAlDiaResponse;