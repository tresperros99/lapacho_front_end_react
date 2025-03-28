export interface NuevoSocioDependienteDto {
  idSocio: number;
  dependientes: Dependiente[];
}

export interface Dependiente {
  tipoSocio: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  cedula: string;
  correo: string;
  numeroTel: string;
  direccion: string;
}

export default NuevoSocioDependienteDto;
