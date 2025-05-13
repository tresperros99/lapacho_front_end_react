export interface ObtenerEventosConCategoriasResponse {
    status:     boolean;
    msg:        string;
    eventosMes: EventosMes[];
}

export interface EventosMes {
    idEventoCalendario: number;
    nombreCmp:          string;
    fechaAgendamiento:  null;
    fechaCreacion:      Date;
    horaDesde:          Date;
    horaHasta:          Date;
    descripcion:        string;
    idTipoEvento:       number;
    todoEldia:          boolean;
    categoriasEvento:   CategoriasEvento[];
}

export interface CategoriasEvento {
    idCategoria:        number;
    idEventoCalendario: number;
    costo:              number;
    descripcion:        string;
    nombreCategoria:    string;
    nivelMinimo:        number | null;
    niveMaximo:         number | null;
    edadMaxima:         number | null;
    edadMinima:         number;
    sexo:               null | string;
}

export default ObtenerEventosConCategoriasResponse;