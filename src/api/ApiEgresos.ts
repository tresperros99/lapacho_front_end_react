import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import NuevoEgresoDto from "../models/dtos/egresos/NuevoEgresoDto.model";
import EgresoCargadoResponse from "../models/responses/egresos/EgresoCargado.response";
import ListadoEgresosUsuarioResponse from "../models/responses/egresos/ListadoEgresosUsuario.response";
import TipoEgresoResponse from "../models/responses/egresos/TipoEgreso.response";

const { egresos } = appConfig

export const getListarTipoDeEgreso = async () => { 
    const url = egresos.listarTipoEgresos
    const tipoEgresoResp = await axiosInstance.get<TipoEgresoResponse[]>(url);
    if (tipoEgresoResp) {
        if (tipoEgresoResp.status === 200) {
            return tipoEgresoResp.data
        } else {
            return tipoEgresoResp.data
        }
    }else{
       return null
    }
}

export const postCargarEgreso= async (nuevoEgreso:NuevoEgresoDto) => { 
    const url = appConfig.egresos.cargarEgresos
    const cargarEgresoResp = await axiosInstance.post<EgresoCargadoResponse>(url,nuevoEgreso);
    if (cargarEgresoResp) {
        if (cargarEgresoResp.status === 200) {
            return cargarEgresoResp.data
        } else {
            return cargarEgresoResp.data
        }
    }else{
       return null
    }
}


export const getListadoEgresosUsuarios = async (fechaDesde: string, fechaHasta: string, pagina: string) => {
    try {
        const url = appConfig.egresos.obtenerEgresos.replace('${fechaDesde}', fechaDesde).replace('${fechaHasta}', fechaHasta).replace('${pagina}', pagina);
        const responseListadoEgresos = await axiosInstance.get<ListadoEgresosUsuarioResponse>(url);
        if (responseListadoEgresos) {
            if (responseListadoEgresos.status === 200) {
                return responseListadoEgresos.data
            } else {
                return responseListadoEgresos.data
            }
        }
    } catch (error) {
        console.error('Error al obtener el listado de ingresos:', error);
        return null;
    }
};
