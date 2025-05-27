export interface AgendarClaseDto {
  idProfesor: number;
  inicio: Date;
  fin: Date;
  idMesa: number;
  idCliente?: number;

}

export default AgendarClaseDto;
