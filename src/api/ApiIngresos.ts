import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import NuevoIngresoDto from "../models/dtos/ingresos/NuevoIngresoDto.models";
import IngresoCagadoResponse from "../models/responses/ingresos/IngresoCargado.response";

export const postCargarIngreso = async (nuevoIngreso:NuevoIngresoDto) => { 
    const url = appConfig.ingresos.cargarIngresos
    const cargarIngresoResp = await axiosInstance.post<IngresoCagadoResponse>(url,nuevoIngreso);
    if (cargarIngresoResp) {
        if (cargarIngresoResp.status === 200) {
            return cargarIngresoResp.data
        } else {
            return cargarIngresoResp.data
        }
    }else{
       return null
    }
}