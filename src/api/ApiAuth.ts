import axiosInstance from "../axiosInstance";
import appConfig from "../config/config"
import { LoginResponse } from "../models/responses/Login.response";

export const login = async (user:string, password:string) => { 
    const url = appConfig.auth.login;
    let respuesta:LoginResponse| null = {} as LoginResponse
    const loginResp = await axiosInstance.post<LoginResponse>(url,{
        usuario : user,
        contraseña :password
    });
    if (loginResp) {
        if (loginResp.status === 200) {
            respuesta = loginResp.data
            return respuesta
        }else {
            respuesta = null
        }
    }else{
        respuesta = null
    }
    return respuesta;
}