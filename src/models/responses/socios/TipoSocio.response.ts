export interface TipoSocioResponse {
  status: boolean;
  msj: string;
  tipoSocio: TipoSocio[];
}

export interface TipoSocio {
  idTipoSocio: number;
  descTipoSocio: string;
}

export default TipoSocioResponse;
