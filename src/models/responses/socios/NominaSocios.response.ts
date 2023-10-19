export interface NominaSociosResponse {
    status:            boolean;
    msg:               string;
    sociosFormateados: SociosFormateado[];
}

export interface SociosFormateado {

    idSocio:         number;
    contraseña:      string;
    nombre:          string;
    apellido:        string;
    tipoSocio:       number;
    numeroTel:       string;
    creadoEn:        Date;
    cedula:          string;
    fechaNacimiento: Date;
    direccionSocio:  null;
    
}

export default NominaSociosResponse;