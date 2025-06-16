import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import { formatearRangoFechas } from "../helpers/fechas";
import GenerarMovimientoDeCajaVentaDto from "../models/dtos/caja/generarMovimientoDeCajaVentaDto.model";
import MovimientoDeVentaResponse from "../models/responses/caja/MovimientoDeVenta.response";
import ObtenerTipoPagoResponse from "../models/responses/caja/ObtenerTipoPago.response";
import ResumenCajaXFecharesponse from "../models/responses/caja/ResumenCajaXFecha";
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
export const putCerrarCaja = async () => {
  const url = caja.cerrarCaja;
  const cerrarCajaResp = await axiosInstance.put<SuccessResponse>(url);
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

export const obtenerResumenXFecha = async (
  desde: Date,
  Hasta: Date,
  pagina = 1,
  cantidad = 10,
) => {
  const url = caja.obtenerResumenXFecha;

  const { fechaDesde, fechaHasta } = formatearRangoFechas(desde, Hasta);

  const params = {
    fecha_desde: fechaDesde,
    fecha_hasta: fechaHasta,
    pagina,
    cantidad,
  };
  const obtenerResumenXFechaResp =
    await axiosInstance.get<ResumenCajaXFecharesponse>(url, { params });
  if (obtenerResumenXFechaResp) {
    if (obtenerResumenXFechaResp.status === 200) {
      return obtenerResumenXFechaResp.data;
    } else {
      return obtenerResumenXFechaResp.data;
    }
  } else {
    return null;
  }
};

export const putAdjuntarComprobanteVenta = async (
  nroFactura: string,
  timbrado: number,
  file: File,
) => {
  const url = caja.adjuntarComprobanteVenta;
  const params = {
    nro_factura: nroFactura,
    timbrado,
  };
  const formData = new FormData();
  formData.append("archivo", file);

  const adjuntarComprobanteResp = await axiosInstance.put<SuccessResponse>(
    url,
    formData,
    { params, headers: { "Content-Type": "multipart/form-data" } },
  );
  if (adjuntarComprobanteResp) {
    if (adjuntarComprobanteResp.status === 200) {
      return adjuntarComprobanteResp.data;
    } else {
      return adjuntarComprobanteResp.data;
    }
  } else {
    return null;
  }
};
