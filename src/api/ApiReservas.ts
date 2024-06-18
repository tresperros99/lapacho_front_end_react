import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import AgendarReservaClubDto from "../models/dtos/reservas/AgendarReserva.dto.model";
import AgendarReservaClubResponse from "../models/responses/reservas/AgendarReservasClub.response";
import ReservasDelClubResponse from "../models/responses/reservas/ReservasDelClub.response";

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

export const postAgendarReservaDelClub = async (agendarReservaDto:AgendarReservaClubDto) => {
    const url = reservas.agendarReservasDelClub

    const agendarReservasResp = await axiosInstance.post<AgendarReservaClubResponse>(url,agendarReservaDto);
    if (agendarReservasResp) {
        if (agendarReservasResp.status === 200) {
            return agendarReservasResp.data
        } else {
            return agendarReservasResp.data
        }
    }else{
       return null
    }
}

