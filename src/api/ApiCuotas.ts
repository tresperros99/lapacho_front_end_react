import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import PagarCuotaPendienteSocioDto from "../models/dtos/socios/cuotas/PagoCuotasSocioDto.model";
import { PagoCuotaSociosVariasDto } from "../models/dtos/socios/cuotas/PagoCuotasSocioVariasDto.model";
import CuotaPagadaResponse from "../models/responses/cuotas/CuotaSocioPagada.response";
import ListadoCuotasPendientesDelMesResponse from "../models/responses/cuotas/CuotasPendientesDelMes.response";
import CuotasSociosPagadasResponse from "../models/responses/cuotas/CuotasSociosPagadas.response";
import { ListadoCuotasPendientesSocio } from "../models/responses/cuotas/ListadoCuotasPendientesSocio.response";

const { cuotas } = appConfig;

export const getCuotasPendientesSocio = async (
  nroCedula: string,
  annio: string,
) => {
  const url = cuotas.getListadoCuotasPendientesSocio;
  const params = {
    numero_cedula: nroCedula,
    annio,
  };
  const cuotasPagadasSocioResp =
    await axiosInstance.get<ListadoCuotasPendientesSocio>(url, { params });
  if (cuotasPagadasSocioResp) {
    if (cuotasPagadasSocioResp.status === 200) {
      return cuotasPagadasSocioResp.data;
    } else {
      return cuotasPagadasSocioResp.data;
    }
  } else {
    return null;
  }
};

export const getCuotasPendientesDelMes = async () => {
  const url = cuotas.getListadocuotasPendientesMes;

  const listadocuotasPendientesMesResp =
    await axiosInstance.get<ListadoCuotasPendientesDelMesResponse>(url);
  if (listadocuotasPendientesMesResp) {
    if (listadocuotasPendientesMesResp.status === 200) {
      return listadocuotasPendientesMesResp.data;
    } else {
      return listadocuotasPendientesMesResp.data;
    }
  } else {
    return null;
  }
};

export const getCuotasPagadasDelMes = async () => {
  const url = cuotas.getCuotasPagadasDelMes;

  const listadoCuotasPagadasDelMesResp =
    await axiosInstance.get<ListadoCuotasPendientesDelMesResponse>(url);
  if (listadoCuotasPagadasDelMesResp) {
    if (listadoCuotasPagadasDelMesResp.status === 200) {
      return listadoCuotasPagadasDelMesResp.data;
    } else {
      return listadoCuotasPagadasDelMesResp.data;
    }
  } else {
    return null;
  }
};

export const postPagarCuotaPendienteSocio = async (
  pagarCuotaPendienteSocioDto: PagarCuotaPendienteSocioDto,
) => {
  const url = cuotas.pagarCuotaSocio;

  const pagarCuotaSocioResp = await axiosInstance.post<CuotaPagadaResponse>(
    url,
    pagarCuotaPendienteSocioDto,
  );
  if (pagarCuotaSocioResp) {
    if (pagarCuotaSocioResp.status === 200) {
      return pagarCuotaSocioResp.data;
    } else {
      return pagarCuotaSocioResp.data;
    }
  } else {
    return null;
  }
};

export const getGrillaCuotasExcel = async () => {
  try {
    const url = appConfig.cuotas.getGrillaDeCuotasExcel;
    const grillaCuotasExcelResp = await axiosInstance.get(url, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
    if (grillaCuotasExcelResp) {
      if (grillaCuotasExcelResp.status === 200) {
        return grillaCuotasExcelResp.data;
      } else {
        return grillaCuotasExcelResp.data;
      }
    }
  } catch (error) {
    console.error("Error al obtener la grilla de cuotas:", error);
    return null;
  }
};

export const postPagoCuotasSociosVarias = async (
  pagoCuotasSocioVariasDto: PagoCuotaSociosVariasDto,
) => {
  const url = cuotas.pagarCuotaSocio;

  const pagarCuotasSocioResp =
    await axiosInstance.post<CuotasSociosPagadasResponse>(
      url,
      pagoCuotasSocioVariasDto,
    );
  if (pagarCuotasSocioResp) {
    if (pagarCuotasSocioResp.status === 200) {
      return pagarCuotasSocioResp.data;
    } else {
      return pagarCuotasSocioResp.data;
    }
  } else {
    return null;
  }
};
