export interface AgendarClaseResponse {
    status:        boolean;
    msg:           string;
    claseAgendada: ClaseAgendada;
}

export interface ClaseAgendada {
    idAgendamiento:    number;
    nombreCmp:         string;
    fechaAgendamiento: Date;
    fechaCreacion:     Date;
    horaDesde:         Date;
    horaHasta:         Date;
    descMesa:          string;
    idMesa:            number;
    idSocio:           number;
    nombreProfesor:    string;
    idProfesor:        number;
    claseAgendada:     null;
    montoAbonado:      null;
}

export default AgendarClaseResponse;