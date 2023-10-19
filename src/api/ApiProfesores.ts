import { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import { NuevoProfesorDto } from "../models/dtos/profesores/NuevoProfesorDto.models";
import NominaProfesoresResponse from "../models/responses/profesores/NominaProfesores.response";
import { NuevoProfesorResponse } from "../models/responses/profesores/NuevoProfesor.response";

export const crearActualizarEliminarProfesor = async (marca:'crear'|'actualizar'|'eliminar',nuevoProfesorDto?:NuevoProfesorDto, idProfesor?:number,) => { 
    const url = appConfig.profesores.profesores;
    let profesorRes = {} as AxiosResponse<NuevoProfesorResponse, any>
    let respuesta:NuevoProfesorResponse | null = null;
    if (idProfesor) {
        if (marca === 'actualizar') {
            profesorRes = await axiosInstance.put<NuevoProfesorResponse>(`${url}/${idProfesor}`,nuevoProfesorDto);
        }else if (marca ==='eliminar') {
            profesorRes = await axiosInstance.delete<NuevoProfesorResponse>(`${url}/${idProfesor}`); 
        }
    }else{
        profesorRes = await axiosInstance.post<NuevoProfesorResponse>(url,nuevoProfesorDto);
    }
    if (profesorRes) {
        if (profesorRes.status === 200) {
            respuesta = profesorRes.data
            return respuesta
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}
export const getNominaProfesores = async () => { 
    const url = appConfig.profesores.profesores;
    let respuesta:NominaProfesoresResponse| null = {} as NominaProfesoresResponse
    const getProfesresResp = await axiosInstance.get<NominaProfesoresResponse>(url);
    if (getProfesresResp) {
        if (getProfesresResp.status === 200) {
            respuesta = getProfesresResp.data
            return respuesta
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}