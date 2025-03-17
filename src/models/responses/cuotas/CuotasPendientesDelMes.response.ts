import CuotasPendiente from "./CuotasPendiente";

export interface ListadoCuotasPendientesDelMesResponse {
  status: boolean;
  msj: string;
  cuotasPendientes: CuotasPendiente[];
}

export default ListadoCuotasPendientesDelMesResponse;
