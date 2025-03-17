export interface ListadoEgresosUsuarioResponse {
  status: boolean;
  msg: string;
  egresosXFecha: EgresosXFecha[];
}

export interface EgresosXFecha {
  idOperacionEgreso: number;
  idSocio: number;
  nombreUsuario: string;
  nombreCmp: string;
  tipoEgreso: string;
  comentario: string;
  nroFactura: string;
  monto: number;
  fechaPago: Date;
  fechaCarga: Date;
  fechaActualizacion: Date;
}

export default ListadoEgresosUsuarioResponse;
