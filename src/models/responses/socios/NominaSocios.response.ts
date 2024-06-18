export interface NominaSociosResponse {
    status:            boolean;
    msg:               string;
    cant:              number;
    sociosFormateados: SociosFormateado[];
}

export interface SociosFormateado {
    nombreSocio: string;
    cedula:      string;
    idSocio:     number;
    estadoSocio: number;
}
