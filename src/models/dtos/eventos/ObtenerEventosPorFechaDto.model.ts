export interface ObtenerEventosPorFechaDto {
    fechaDesde: Date;
    fechaHasta: Date;
    cantidad:   number;
    pagina:     number;
}

export default ObtenerEventosPorFechaDto;