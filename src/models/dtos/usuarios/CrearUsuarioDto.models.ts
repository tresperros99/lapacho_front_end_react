export interface CrearUsuarioDto {
    idCliente:     number;
    cedula:        string;
    contraseña:    string;
    nombreUsuario: string;
    idAcceso:      number;
}

export default CrearUsuarioDto;