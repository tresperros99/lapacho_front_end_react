import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import ObtenerCantidadSociosAtrasadosXMes from "../models/responses/graficos/ObtenerCantidadSociosAtrasadosXMes";
import ObtenerCostoClaseProfesoresResponse from "../models/responses/graficos/ObtenerCostoClaseProfesores.response";
import ObtenerSociosAlDiaResponse from "../models/responses/graficos/ObtenerSociosAlDia.response";

const { graficos } = appConfig;


export const getCostoClaseProfesores = async () => {
  const url = graficos.obtenerCostosDeProfesores;
  const costoClaseProfesoresResp = await axiosInstance.get<ObtenerCostoClaseProfesoresResponse>(url);
  if (costoClaseProfesoresResp) {
    if (costoClaseProfesoresResp.status === 200) {
      return costoClaseProfesoresResp.data;
    } else {
      return costoClaseProfesoresResp.data;
    }
  } else {
    return null;
  }
};


export const getCantidadSociosAlDia = async () => {
  const url = graficos.obtenerCantidadSociosAlDia;
  const cantidadSocioAlDiaResp = await axiosInstance.get<ObtenerSociosAlDiaResponse>(url);
  if (cantidadSocioAlDiaResp) {
    if (cantidadSocioAlDiaResp.status === 200) {
      return cantidadSocioAlDiaResp.data;
    } else {
      return cantidadSocioAlDiaResp.data;
    }
  } else {
    return null;
  }
};

export const getCantidadSociosAtrasadosXMes = async () => {
  const url = graficos.obtenerCantidadSociosAtrasadosXMes;
  const cantidadSociosAtrasosMesResp = await axiosInstance.get<ObtenerCantidadSociosAtrasadosXMes>(url);
  if (cantidadSociosAtrasosMesResp) {
    if (cantidadSociosAtrasosMesResp.status === 200) {
      return cantidadSociosAtrasosMesResp.data;
    } else {
      return cantidadSociosAtrasosMesResp.data;
    }
  } else {
    return null;
  }
};