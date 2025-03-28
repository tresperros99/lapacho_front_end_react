import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import GenerarMovimientoDeCajaVentaDto from "../models/dtos/caja/generarMovimientoDeCajaVentaDto.model";
import MovimientoDeVentaResponse from "../models/responses/caja/MovimientoDeVenta.response";
import ObtenerTipoPagoResponse from "../models/responses/caja/ObtenerTipoPago.response";
import SuccessResponse from "../models/responses/shared/Success.response";

const { caja } = appConfig;

export const postCrearCaja = async (montoInicial: number) => {
  const url = caja.crearCaja;
  const crearCajaResp = await axiosInstance.post<SuccessResponse>(url, {
    montoInicial,
  });
  if (crearCajaResp) {
    if (crearCajaResp.status === 200) {
      return crearCajaResp.data;
    } else {
      return crearCajaResp.data;
    }
  } else {
    return null;
  }
};
export const postCerrarCaja = async (idCaja: number) => {
  const url = caja.cerrarCaja;
  const cerrarCajaResp = await axiosInstance.post<SuccessResponse>(url, {
    idCaja,
  });
  if (cerrarCajaResp) {
    if (cerrarCajaResp.status === 200) {
      return cerrarCajaResp.data;
    } else {
      return cerrarCajaResp.data;
    }
  } else {
    return null;
  }
};

export const postGenerarMovimientoDeVenta = async (
  generarMovimientoDeCajaVentaDto: GenerarMovimientoDeCajaVentaDto,
) => {
  const url = caja.generarMovimientoCajaVenta;
  const generarMovimientoResp =
    await axiosInstance.post<MovimientoDeVentaResponse>(
      url,
      generarMovimientoDeCajaVentaDto,
    );
  if (generarMovimientoResp) {
    if (generarMovimientoResp.status === 200) {
      return generarMovimientoResp.data;
    } else {
      return generarMovimientoResp.data;
    }
  } else {
    return null;
  }
};

export const getTiposPago = async () => {
  const url = caja.obtenerTipoPago;
  const tipoPagoResp = await axiosInstance.get<ObtenerTipoPagoResponse>(url);
  if (tipoPagoResp) {
    if (tipoPagoResp.status === 200) {
      return tipoPagoResp.data;
    } else {
      return tipoPagoResp.data;
    }
  } else {
    return null;
  }
};
