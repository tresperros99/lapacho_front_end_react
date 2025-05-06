export interface NuevoEventoDto {
  tipoEvento: number;
  nombreEvento: string;
  descripcion: string;
  horaDesde: Date;
  horaHasta: Date;
  todoElDia: string;
  costoEvento: number;
  requerimientos?: Requerimiento[];
  categorias?: Categoria[];
}

export interface Categoria {
  nombreCategoria: string;
  descripcion: string;
  costoCategoria: number;
  edadMaxima: number | null;
  edadMinima: number | null;
  nivelMaximo: number | null;
  nivelMinimo: number | null;
  sexoPermitido: null | string;
}

export interface Requerimiento {
  descripcion: string;
  cantidad: number;
  costo: number;
}
