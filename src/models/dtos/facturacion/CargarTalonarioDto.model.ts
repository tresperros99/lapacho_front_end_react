export interface CargarTalonarioDto {
  nroTimbrado: number;
  codEstablecimiento: string;
  puntoExpedicion: string;
  fechaVencimiento: Date;
  numeroDesde: number;
  numeroHasta: number;
  rucEmisor: string;
  razonSocial: string;
}

export default CargarTalonarioDto;
