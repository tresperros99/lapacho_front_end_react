import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import NuevoSocioDto from "../models/dtos/socios/NuevoSocioDto.model";
import NominaSociosResponse from "../models/responses/socios/NominaSocios.response";

export const crearNuevoSocio = async (crearNuevoSocio:NuevoSocioDto) => { 
    const url = appConfig.socios.socios;
    const crearNuevoSocioRes = await axiosInstance.post<any>(url,crearNuevoSocio);
    let respuesta:any = {}
    if (crearNuevoSocioRes) {
        if (crearNuevoSocioRes.status === 200) {
            respuesta = crearNuevoSocioRes.data
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}
export const actualizarSocio = async (idSocio:number,socio:NuevoSocioDto) => { 
    const url = appConfig.socios.socios;
    const actualizareNuevoSocioRes = await axiosInstance.put<any>(`${url}/${idSocio}`,socio);
    let respuesta:any = {}
    if (actualizareNuevoSocioRes) {
        if (actualizareNuevoSocioRes.status === 200) {
            respuesta = actualizareNuevoSocioRes.data
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}
export const eliminarSocio = async (idSocio:number) => { 
    const url = appConfig.socios.socios;
    const eliminarSocioResponse = await axiosInstance.delete<any>(`${url}/${idSocio}`);
    let respuesta:any = {}
    if (eliminarSocioResponse) {
        if (eliminarSocioResponse.status === 200) {
            respuesta = eliminarSocioResponse.data
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}

export const getNominaSocios = async () => { 
    const url = appConfig.socios.socios;
    let respuesta:NominaSociosResponse| null = {} as NominaSociosResponse
    const getNominaSociosResp = await axiosInstance.get<NominaSociosResponse>(url);
    if (getNominaSociosResp) {
        if (getNominaSociosResp.status === 200) {
            respuesta = getNominaSociosResp.data
            return respuesta
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}