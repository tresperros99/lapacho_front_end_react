import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import ReservasDelClubResponse from "../models/responses/ReservasDelClub.response";

const { reservas } = appConfig


export const getReservasDelClub = async (fechaDesde:string, fechaHasta:string, pagina:number) => {
    const url = reservas.getReservasDelClub
    const params = {
        fecha_desde: fechaDesde,
        fecha_hasta: fechaHasta,
        pagina
    }
    const reservasDelClubResp = await axiosInstance.get<ReservasDelClubResponse>(url,{params});
    if (reservasDelClubResp) {
        if (reservasDelClubResp.status === 200) {
            return reservasDelClubResp.data
        } else {
            return reservasDelClubResp.data
        }
    }else{
       return null
    }
}
