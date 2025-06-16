export interface EditarClaseDto {
    idProfesor:        number;
    fechaAgendamiento: string;
    inicio:            Date;
    fin:               Date;
    idMesa:            number;
    idAgendamiento:    number;
}

export default EditarClaseDto;