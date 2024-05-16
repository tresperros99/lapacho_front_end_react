import CuotasPendiente from "./CuotasPendiente";

export interface ListadoCuotasPendientesSocio {
    status:           boolean;
    msj:              string;
    cuotasPendientes: CuotasPendiente[];
}
export default ListadoCuotasPendientesSocio;