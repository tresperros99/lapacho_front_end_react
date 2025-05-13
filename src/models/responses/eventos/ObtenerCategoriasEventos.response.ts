export interface ObtenerCategoriasEventosResponse {
    status:           boolean;
    msg:              string;
    categoriasEvento: CategoriasEvento[];
    cantidad:         number;
}

export interface CategoriasEvento {
    descripcion:         string;
    idCategoria:         number;
    nombreCategoria:     string;
    idEvento:            number;
    edadMinima:          number;
    edadMaxima:          number;
    cierreInscripciones: null;
    nivelMaximo:         number;
    nivelMinimo:         number;
    sexoPermitido:       string;
    costo:               number;
}


export default ObtenerCategoriasEventosResponse;