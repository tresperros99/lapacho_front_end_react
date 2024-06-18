export interface ObtenerTodosEventosClub{
    status:       boolean;
    msg:          string;
    eventosFecha: EventosFecha;
}

export interface EventosFecha {
    eventos:  Evento[];
    clases:   Clase[];
    reservas: Reserva[];
}

export interface Clase {
    idAgendamiento:    number;
    idProfesor:        number;
    nombreProfesor:    string;
    idSocio:           number;
    nombreCmp:         string;
    fechaAgendamiento: Date;
    idMesa:            number;
    descMesa:          string;
    horarioInicio:     Date;
    horarioHasta:      Date;
    claseAgendada:     null;
    montoAbonado:      null;
    fechaCreacion:     Date;
}

export interface Evento {
    idEventoCalendario: number;
    idTipoEvento:       number;
    horaDesde:          Date;
    fechaCreacion:      Date;
    horaHasta:          Date;
    costo:              number;
    descripcion:        string;
    nombreCmp:          string;
    todoEldia:          boolean;
    fechaAgendamiento:  Date;
    descTipoEvento:     string;
}

export interface Reserva {
    idSocioReserva:    number;
    nombreCmp:         string;
    fechaAgendamiento: Date;
    fechaCreacion:     Date;
    horaDesde:         Date;
    horaHasta:         Date;
    descMesa:          string;
    idMesa:            number;
}

export default ObtenerTodosEventosClub;