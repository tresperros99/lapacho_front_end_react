export interface InscripcionesEventosResponse {
    status:            boolean;
    msg:               string;
    cantInscripciones: number;
    inscripciones:     Inscripcion[];
}

export interface Inscripcion {
    idInscripcion:        number;
    idCategoria:          number;
    nombreCategoria:      string;
    idCliente:            number;
    idEventoCalendario:   number;
    descInscripcion:      string;
    fechaInscripcion:     Date;
    inscripcionCreadoEn:  Date;
    estado:               string;
    inscripcionEditadoEn: null;
    nombre:               string;
}

export default InscripcionesEventosResponse;