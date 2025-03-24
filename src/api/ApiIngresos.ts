import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import NuevoIngresoDto from "../models/dtos/ingresos/NuevoIngresoDto.models";
import { IngresoCargadoResponse } from "../models/responses/ingresos/IngresoCargado.response";
import ListadoIngresosUsuarioResponse from "../models/responses/ingresos/ListadoingresosUsuario.response";

export const postCargarIngreso = async (nuevoIngreso: NuevoIngresoDto) => {
  const url = appConfig.ingresos.cargarIngresos;
  const cargarIngresoResp = await axiosInstance.post<IngresoCargadoResponse>(
    url,
    nuevoIngreso,
  );
  if (cargarIngresoResp) {
    if (cargarIngresoResp.status === 200) {
      return cargarIngresoResp.data;
    } else {
      return cargarIngresoResp.data;
    }
  } else {
    return null;
  }
};

export const getListadoIngresosUsuarios = async (
  fechaDesde: string,
  fechaHasta: string,
  pagina: string,
) => {
  try {
    const url = appConfig.ingresos.obtenerIngresos
      .replace("${fechaDesde}", fechaDesde)
      .replace("${fechaHasta}", fechaHasta)
      .replace("${pagina}", pagina);
    const responseListadoIngresos =
      await axiosInstance.get<ListadoIngresosUsuarioResponse>(url);
    if (responseListadoIngresos) {
      if (responseListadoIngresos.status === 200) {
        return responseListadoIngresos.data;
      } else {
        return responseListadoIngresos.data;
      }
    }
  } catch (error) {
    console.error("Error al obtener el listado de ingresos:", error);
    return null;
  }
};

export const getExcelIngresos = async (
  fechaDesde: string,
  fechaHasta: string,
) => {
  try {
    const url = appConfig.ingresos.obtenerExcelIngresos
      .replace("${fechaDesde}", fechaDesde)
      .replace("${fechaHasta}", fechaHasta);
    const excelIngresosResp = await axiosInstance.get(url, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
    if (excelIngresosResp) {
      if (excelIngresosResp.status === 200) {
        return excelIngresosResp.data;
      } else {
        return excelIngresosResp.data;
      }
    }
  } catch (error) {
    console.error("Error al obtener el excel de Ingresos:", error);
    return null;
  }
};
