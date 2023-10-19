export interface NuevoSocioDto {
    tipoSocio:       number;
    idAcceso:        number;
    nombre:          string;
    apellido:        string;
    estadoSocio:     number;
    fechaNacimiento: string;
    cedula:          string;
    correo:          string;
    numeroTel:       string;
    direccion:       string;
    ruc:             string;
    contraseña:      string;
    nombreUsuario:   string;
}

export default NuevoSocioDto;