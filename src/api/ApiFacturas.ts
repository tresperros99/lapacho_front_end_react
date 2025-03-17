import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import CargarTalonarioDto from "../models/dtos/facturacion/CargarTalonarioDto.model";
import UltimoNumeroFacturaResponse from "../models/responses/facturas/UltimoNumeroFactura.response";
import SuccessResponse from "../models/responses/shared/Success.response";

const { facturacion } = appConfig;

export const postCargarTalonario = async (
  cargarTalonarioDto: CargarTalonarioDto,
) => {
  const url = facturacion.crearTalonario;
  const crearTalonarioResp = await axiosInstance.post<SuccessResponse>(
    url,
    cargarTalonarioDto,
  );
  if (crearTalonarioResp) {
    if (crearTalonarioResp.status === 200) {
      return crearTalonarioResp.data;
    } else {
      return crearTalonarioResp.data;
    }
  } else {
    return null;
  }
};

export const getUltimoNumeroDeFactura = async () => {
  const url = facturacion.obtenerUltimoNumeroFactura;
  const ultimoNumeroResp =
    await axiosInstance.get<UltimoNumeroFacturaResponse>(url);
  if (ultimoNumeroResp) {
    if (ultimoNumeroResp.status === 200) {
      return ultimoNumeroResp.data;
    } else {
      return ultimoNumeroResp.data;
    }
  } else {
    return null;
  }
};
