import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import GenerarComprasClubDto from "../models/dtos/compras/GenerarComprasClub.model";
import { ObtenerComprasClubResponse } from "../models/responses/compras/ObtenerComprasClub.response";
import SuccessResponse from "../models/responses/shared/Success.response";


const { compras } = appConfig;



export const postGenerarComprasDelClub = async (generarComprasClubDto: GenerarComprasClubDto) => {
  const url = compras.generarComprasClub;

  const generarComprasClubResp = await axiosInstance.post<SuccessResponse>(
    url,
    generarComprasClubDto,
  );
  if (generarComprasClubResp) {
    if (generarComprasClubResp.status === 200) {
      return generarComprasClubResp.data;
    } else {
      return generarComprasClubResp.data;
    }
  } else {
    return null;
  }
};



export const getComprasDelClub = async (  pagina: number,
  cantidad: number,) => {
  const url = compras.obtenerComprasClub;
  const params = {
    pagina,
    cantidad,
  };
  const comprasClubResp = await axiosInstance.get<ObtenerComprasClubResponse>(url,{params});
  if (comprasClubResp) {
    if (comprasClubResp.status === 200) {
      return comprasClubResp.data;
    } else {
      return comprasClubResp.data;
    }
  } else {
    return null;
  }
}
;