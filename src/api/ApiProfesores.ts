import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import { NuevoProfesorDto } from "../models/dtos/profesores/NuevoProfesorDto.models";
import NominaProfesoresResponse from "../models/responses/profesores/NominaProfesores.response";
import SuccessResponse from "../models/responses/shared/Success.response";

const { profesores } = appConfig;

export const crearNuevoProfesor = async (
  crearNuevoProfesor: NuevoProfesorDto,
) => {
  const url = profesores.crearProfesor;
  const crearNuevoProfesorResp = await axiosInstance.post<SuccessResponse>(
    url,
    crearNuevoProfesor,
  );
  if (crearNuevoProfesorResp) {
    if (crearNuevoProfesorResp.status === 200) {
      return crearNuevoProfesorResp.data;
    } else {
      return crearNuevoProfesorResp.data;
    }
  } else {
    return null;
  }
};

export const getProfesoresClub = async (cantidad: number, omitir: number) => {
  const url = profesores.obtenerProfesores;
  const params = {
    cantidad,
    omitir,
  };
  const getNominaProfesoresResp =
    await axiosInstance.get<NominaProfesoresResponse>(url, { params });
  if (getNominaProfesoresResp) {
    if (getNominaProfesoresResp.status === 200) {
      return getNominaProfesoresResp.data;
    } else {
      return getNominaProfesoresResp.data;
    }
  } else {
    return null;
  }
};

export const eliminarProfesorClub = async (idProfesor: number) => {
  const url = profesores.eliminarProfesor;
  const params = {
    idProfesor,
  };
  const deleteProfesorResp = await axiosInstance.delete(url, { params });
  if (deleteProfesorResp) {
    if (deleteProfesorResp.status === 200) {
      return deleteProfesorResp.data;
    } else {
      return deleteProfesorResp.data;
    }
  } else {
    return null;
  }
};

export const putActualizarPorfesor = async (idProfesor:number,profesorFormateado: NuevoProfesorDto) => {
  const url = profesores.editarProfesor;
  const editarProfesorDto = {
    idProfesor,
    ...profesorFormateado
  }

  const actualizarProfesorResp = await axiosInstance.put(url, editarProfesorDto);
  if (actualizarProfesorResp) {
    if (actualizarProfesorResp.status === 200) {
      return actualizarProfesorResp.data;
    } else {
      return actualizarProfesorResp.data;
    }
  } else {
    return null;
  }
};


export const getBuscadorProfesores = async (nombreCedula: string) => {
  const url = appConfig.profesores.buscadorProfesores;
  const params = {
    busqueda: nombreCedula,
  };
  const getProfesoresResp = await axiosInstance.get<NominaProfesoresResponse>(url, {
    params,
  });
  if (getProfesoresResp) {
    if (getProfesoresResp.status === 200) {
      return getProfesoresResp.data;
    } else {
      return getProfesoresResp.data;
    }
  } else {
    return null;
  }
};
