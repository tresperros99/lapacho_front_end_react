import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import NuevoSocioDependienteDto from "../models/dtos/socios/NuevoSocioDependienteDto.model";
import NuevoSocioDto from "../models/dtos/socios/NuevoSocioDto.model";
import SuccessResponse from "../models/responses/shared/Success.response";
import NomiSociosResponse from "../models/responses/socios/NominaSocios.response";
import { SociosPorNombreApellido } from "../models/responses/socios/SociosPorCedula.response";
import TipoSocioResponse from "../models/responses/socios/TipoSocio.response";

const { socios } = appConfig;
export const crearNuevoSocio = async (crearNuevoSocio: NuevoSocioDto) => {
  const url = appConfig.socios.crearSocios;
  const crearNuevoSocioRes = await axiosInstance.post<SuccessResponse>(
    url,
    crearNuevoSocio,
  );
  if (crearNuevoSocioRes) {
    return crearNuevoSocioRes.data;
  } else {
    return null;
  }
};

export const crearNuevoSocioDependiente = async (
  crearNuevoSocioDependiente: NuevoSocioDependienteDto,
) => {
  const url = appConfig.socios.crearSocioDependiente;
  const crearNuevoSocioDependienteRes =
    await axiosInstance.post<SuccessResponse>(url, crearNuevoSocioDependiente);
  if (crearNuevoSocioDependienteRes) {
    return crearNuevoSocioDependienteRes.data;
  } else {
    return null;
  }
};
export const putEditarSocio = async (socio: NuevoSocioDto) => {
  const url = appConfig.socios.editarSocio;
  const actualizarSocioResp = await axiosInstance.put<SuccessResponse>(
    url,
    socio,
  );
  if (actualizarSocioResp) {
    if (actualizarSocioResp.status === 200) {
      return actualizarSocioResp.data;
    } else {
      return actualizarSocioResp.data;
    }
  } else {
    return null;
  }
};
export const putEliminarSocio = async (idSocio: number) => {
  const url = socios.eliminarSocio;
  const eliminarSocioResp = await axiosInstance.put<SuccessResponse>(url, {
    idCliente: idSocio,
  });
  if (eliminarSocioResp) {
    if (eliminarSocioResp.status === 200) {
      return eliminarSocioResp.data;
    } else {
      return eliminarSocioResp.data;
    }
  } else {
    return null;
  }
};

export const getNominaSocios = async () => {
  const url = socios.obtenerSocios;
  const getNominaSociosResp = await axiosInstance.get<NomiSociosResponse>(url);
  if (getNominaSociosResp) {
    if (getNominaSociosResp.status === 200) {
      return getNominaSociosResp.data;
    } else {
      return getNominaSociosResp.data;
    }
  } else {
    return null;
  }
};

export const getBuscadorSocios = async (nombre: string) => {
  const url = appConfig.socios.buscadorSocio;
  const params = {
    nombre,
  };
  const getSocioResp = await axiosInstance.get<SociosPorNombreApellido>(url, {
    params,
  });
  if (getSocioResp) {
    if (getSocioResp.status === 200) {
      return getSocioResp.data;
    } else {
      return getSocioResp.data;
    }
  } else {
    return null;
  }
};

export const getTipoSocios = async () => {
  const url = appConfig.socios.tipoSocios;
  const getTipoSocioResp = await axiosInstance.get<TipoSocioResponse>(url);
  if (getTipoSocioResp) {
    if (getTipoSocioResp.status === 200) {
      return getTipoSocioResp.data;
    } else {
      return getTipoSocioResp.data;
    }
  } else {
    return null;
  }
};
