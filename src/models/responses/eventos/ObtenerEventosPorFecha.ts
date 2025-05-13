export interface ObternerEventosPorFechaResponse {
    status:  boolean;
    msg:     string;
    torneos: Torneo[];
}

export interface Torneo {
    idEvento:       number;
    idTipoEvento:   number;
    horaDesde:      Date;
    fechaCreacion:  Date;
    horaHasta:      Date;
    descripcion:    string;
    nombreCmp:      string;
    todoEldia:      boolean;
    descTipoEvento: string;
}


export default ObternerEventosPorFechaResponse;