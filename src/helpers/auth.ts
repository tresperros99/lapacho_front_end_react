import CryptoJS from "crypto-js";

export interface DataUser {
  usuario: string;
  contraseña: string;
}
export const encryptPassword = (data: DataUser): string => {
  const key = import.meta.env.VITE_PASSWORD_KEY ?? '';  
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key,
  ).toString();

  return ciphertext;
};
