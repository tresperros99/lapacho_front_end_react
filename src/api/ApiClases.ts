import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import AgendarClaseDto from "../models/dtos/clases/AgendarClaseDto.model";
import AgendarClaseResponse from "../models/responses/clases/AgendarClases.response";
import { MesasDisponiblesResponse } from "../models/responses/clases/MesasDisponibles.response";

const { clases } = appConfig;

export const postAgendarClase = async(agendarClaseDto:AgendarClaseDto) => {
    const url = clases.agendarClae

    const agendarClaseResp = await axiosInstance.post<AgendarClaseResponse>(url,agendarClaseDto);
    if (agendarClaseResp) {
        if (agendarClaseResp.status === 200) {
            return agendarClaseResp.data
        } else {
            return agendarClaseResp.data
        }
    }else{
       return null
    }
}

export const getMesasDisponibles = async () => { 
    const url = clases.getMesasDisponibles
    const mesasDisponiblesResp = await axiosInstance.get<MesasDisponiblesResponse>(url);
    if (mesasDisponiblesResp) {
        if (mesasDisponiblesResp.status === 200) {
            return mesasDisponiblesResp.data
        } else {
            return mesasDisponiblesResp.data
        }
    }else{
       return null
    }
}
