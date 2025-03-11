export interface NuevoSocioDto {
    tipoSocio:       number;
    idAcceso:        number;
    nombre:          string;
    apellido:        string;
    estadoSocio?:    string;
    fechaNacimiento: string;
    cedula:          string;
    correo:          string;
    numeroTel:       string;
    direccion:       string;
    contraseña:      string;
    nombreUsuario:   string;
    dependientes?:   NuevoSocioDto[];
    ruc?:            string;
}

export default NuevoSocioDto;