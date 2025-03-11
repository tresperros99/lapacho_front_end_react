import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import GenerarVentaCuotasVariasDto from "../models/dtos/ventas/cuotas/GenerarVentaCuotasVariasDto.model";
import ReservasDelClubResponse from "../models/responses/reservas/ReservasDelClub.response";
import VentasClientesResponse from "../models/responses/ventas/VentasClientes.response";

const { ventas } = appConfig;

export const postGenerarVentaCuotasVarias = async (
  generarVentaCuotasVariasDto: GenerarVentaCuotasVariasDto
) => {
  const url = ventas.generVentaCuotas;
  const generarVentaCuotaResp =
    await axiosInstance.post<ReservasDelClubResponse>(
      url,
      generarVentaCuotasVariasDto
    );
  if (generarVentaCuotaResp) {
    if (generarVentaCuotaResp.status === 200) {
      return generarVentaCuotaResp.data;
    } else {
      return generarVentaCuotaResp.data;
    }
  } else {
    return null;
  }
};

export const getVentasClientes = async (
  pagina: number,
  cantidad: number,
  cedula: string
) => {
  const url = ventas.obtenerVentasClientes;
  const params = {
    pagina,
    cantidad,
    cedula,
  };
  const obtenerVentasClientesResp =
    await axiosInstance.get<VentasClientesResponse>(url, { params });
  if (obtenerVentasClientesResp) {
    if (obtenerVentasClientesResp.status === 200) {
      return obtenerVentasClientesResp.data;
    } else {
      return obtenerVentasClientesResp.data;
    }
  } else {
    return null;
  }
};
