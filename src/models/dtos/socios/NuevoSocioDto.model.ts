export interface NuevoSocioDto {
  tipoSocio:       number;
  nombre:          string;
  apellido:        string;
  estadoSocio:     number;
  fechaNacimiento: string;
  cedula:          string;
  correo:          string;
  numeroTel:       string;
  direccion:       string;
}


export default NuevoSocioDto;
