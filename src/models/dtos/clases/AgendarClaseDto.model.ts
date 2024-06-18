export interface AgendarClaseDto {
    idProfesor:        number;
    fechaAgendamiento: string;
    inicio:            Date;
    fin:               Date;
    idMesa:            number;
}

export default AgendarClaseDto;