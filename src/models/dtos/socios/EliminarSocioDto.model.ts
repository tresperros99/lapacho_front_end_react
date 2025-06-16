export interface EliminarSocioDto {
    idCliente:       number;
    tipoSocio:       number;
    idAcceso:        number;
    nombre:          string;
    apellido:        string;
    fechaNacimiento: string;
    cedula:          string;
    correo:          string;
    numeroTel:       string;
    direccion:       string;
    ruc:             string;
    contraseña:      string;
    nombreUsuario:   string;
}

export default EliminarSocioDto;