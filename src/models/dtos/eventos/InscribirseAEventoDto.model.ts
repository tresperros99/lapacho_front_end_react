export interface InscribirseAEventoDto {
    idCliente:  number;
    categorias: Categoria[];
}

export interface Categoria {
    idCategoria:     number;
    idEvento:        number;
    descInscripcion: string;
}

export default InscribirseAEventoDto;