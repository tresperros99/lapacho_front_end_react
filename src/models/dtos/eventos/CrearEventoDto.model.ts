export interface CrearEventoDto {
    tipoEvento:        number;
    nombreEvento:      string;
    descripcion:       string;
    fechaAgendamiento: string;
    horaDesde:         Date;
    horaHasta:         Date;
    todoElDia:         string;
    costoEvento:       number;
}

export default CrearEventoDto;