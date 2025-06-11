export interface CancelarClaseDto {
    idProfesor:        number;
    fechaAgendamiento: string;
    inicio:            Date;
    fin:               Date;
    idMesa:            number;
    idAgendamiento:    number;
    monto:             number;
}

export default CancelarClaseDto;