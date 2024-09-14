import CryptoJS from 'crypto-js';
import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import LoginResponse from '../models/responses/Auth/Login.response';

export const login = async (user:string, password:string) => { 
    const url = appConfig.auth.login;
    let respuesta:LoginResponse| null = {} as LoginResponse


const data = {
    "usuario" : user,
    "contraseña" : password
};

var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '5eqrZ0iW69kgI6vNl7FOGylmtT5IEgaI').toString()
    const loginResp = await axiosInstance.post<LoginResponse>(url,{
        data : ciphertext
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