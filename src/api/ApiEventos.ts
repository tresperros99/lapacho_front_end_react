import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import EventosDeAnioResponse from "../models/responses/eventos/EventosDelAnio.response";
import EventosDelMesResponse from "../models/responses/eventos/EventosDelMes.response";


const { eventos } = appConfig


export const getEventosDelMes = async (mes: number) => {
    const url = eventos.obtenerEventosDelMes
    const params = {
        mes
    }
    const eventosDelMesResp = await axiosInstance.get<EventosDelMesResponse>(url,{params});
    if (eventosDelMesResp) {
        if (eventosDelMesResp.status === 200) {
            return eventosDelMesResp.data
        } else {
            return eventosDelMesResp.data
        }
    }else{
       return null
    }
}

export const getEventosDelAnio = async (mes: number) => {
    const url = eventos.obtenerEventosDelAnio

    const eventosAnioResp = await axiosInstance.get<EventosDeAnioResponse>(url);
    if (eventosAnioResp) {
        if (eventosAnioResp.status === 200) {
            return eventosAnioResp.data
        } else {
            return eventosAnioResp.data
        }
    }else{
       return null
    }
}