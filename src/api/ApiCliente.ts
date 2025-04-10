import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import { NuevoClienteDto } from "../models/dtos";
import SuccessResponse from "../models/responses/shared/Success.response";


export const postCrearNuevoCliente = async (crearNuevoCliente: NuevoClienteDto) => {
    const url = appConfig.clientes.crearClientes;
    const crearNuevoClienteRes = await axiosInstance.post<SuccessResponse>(
      url,
      crearNuevoCliente,
    );
    if (crearNuevoClienteRes) {
      return crearNuevoClienteRes.data;
    } else {
      return null;
    }
  };