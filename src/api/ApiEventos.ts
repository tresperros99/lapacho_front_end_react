import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import CrearEventoDto from "../models/dtos/eventos/CrearEventoDto.model";
import TodosEventosClubDto from "../models/dtos/eventos/TodosEventosClubDto.model";
import CrearEventoResponse from "../models/responses/eventos/CrearEventoClub.response";
import EventosDeAnioResponse from "../models/responses/eventos/EventosDelAnio.response";
import EventosDelMesResponse from "../models/responses/eventos/EventosDelMes.response";
import ObtenerTodosEventosClub from "../models/responses/eventos/ObtenerTodosEventosClub";
import TipoEventoResponse from "../models/responses/eventos/TipoEvento.response";


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

export const getTodosEventosDelCLub = async (getEventosMesDto:TodosEventosClubDto) => {
    const url = eventos.obtenerTodosEventosClub

    const todosEventosResp = await axiosInstance.post<ObtenerTodosEventosClub>(url,getEventosMesDto);
    if (todosEventosResp) {
        if (todosEventosResp.status === 200) {
            return todosEventosResp.data
        } else {
            return todosEventosResp.data
        }
    }else{
       return null
    }
}



export const getTipoEventos = async () => {
    const url = eventos.obtenerTipoEventos

    const tipoEventoResp = await axiosInstance.get<TipoEventoResponse>(url);
    if (tipoEventoResp) {
        if (tipoEventoResp.status === 200) {
            return tipoEventoResp.data
        } else {
            return tipoEventoResp.data
        }
    }else{
       return null
    }
}

export const postCrearEventoClub = async (crearEventoDto:CrearEventoDto) => {
    const url = eventos.crearEvento

    const crearEventoResp = await axiosInstance.post<CrearEventoResponse>(url,crearEventoDto);
    if (crearEventoResp) {
        if (crearEventoResp.status === 200) {
            return crearEventoResp.data
        } else {
            return crearEventoResp.data
        }
    }else{
       return null
    }
}
