export interface SociosPorNombreApellido {
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
    numeroTel:       null | string;
    creadoEn:        Date;
    cedula:          string;
    fechaNacimiento: Date;
    direccionSocio:  string;
}
