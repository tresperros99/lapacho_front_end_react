import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import { DataUser, encryptPassword } from "../helpers/auth";
import CrearUsuarioDto from "../models/dtos/usuarios/CrearUsuarioDto.models";
import LoginResponse from "../models/responses/Auth/Login.response";
import ObtenerAccesosResponse from "../models/responses/Auth/ObtenerAccesos.response";
import CrearUsuarioResponse from "../models/responses/usuarios/CrearUsuario.response";

export const login = async (user: string, password: string) => {
  const url = appConfig.auth.login;
  let respuesta: LoginResponse | null = {} as LoginResponse;

  const data:DataUser = {
    usuario: user,
    contraseña: password,
  };

  const loginResp = await axiosInstance.post<LoginResponse>(url, {
    data: encryptPassword(data),
  });
  if (loginResp) {
    if (loginResp.status === 200) {
      respuesta = loginResp.data;
      return respuesta;
    } else {
      respuesta = null;
    }
  } else {
    respuesta = null;
  }
  return respuesta;
};

export const getAccesosUsuario = async () => {
  const url = appConfig.auth.obtenerAccesos;
  const getAccesosUsuarioResp =
    await axiosInstance.get<ObtenerAccesosResponse>(url);
  if (getAccesosUsuarioResp) {
    if (getAccesosUsuarioResp.status === 200) {
      return getAccesosUsuarioResp.data;
    } else {
      return getAccesosUsuarioResp.data;
    }
  } else {
    return null;
  }
};


export const postCrearUsuario = async (crearUsuarioDto:CrearUsuarioDto) => {
  const url = appConfig.auth.crearUsuario;
  const crearUsuarioResp =
    await axiosInstance.post<CrearUsuarioResponse>(url, crearUsuarioDto);
  if (crearUsuarioResp) {
    if (crearUsuarioResp.status === 200) {
      return crearUsuarioResp.data;
    } else {
      return crearUsuarioResp.data;
    }
  } else {
    return null;
  }
}
