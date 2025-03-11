import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import { formatearFechaTipoDate } from "../helpers/fechas";
import AgendarReservaClubDto from "../models/dtos/reservas/AgendarReserva.dto.model";
import AgregarReservaAVentaDto from "../models/dtos/reservas/AgregarReservaVenta.dto.model";
import AgendarReservaClubResponse from "../models/responses/reservas/AgendarReservasClub.response";
import ReservasDelClubResponse, {
  ReservasClub,
} from "../models/responses/reservas/ReservasDelClub.response";
import SuccessResponse from "../models/responses/shared/Success.response";

const { reservas } = appConfig;

export const getReservasDelClub = async (
  fechaDesde: Date,
  fechaHasta: Date,
  pagina: number
) => {
  const url = reservas.getReservasDelClub;
  const fechaDesdeFormateada = formatearFechaTipoDate(fechaDesde);
  const fechaHastaFormateada = formatearFechaTipoDate(fechaHasta);
  const paginaStr = pagina.toString();

  const urlConParametros = url
    .replace("${fechaDesde}", fechaDesdeFormateada)
    .replace("${fechaHasta}", fechaHastaFormateada)
    .replace("${pagina}", paginaStr);

  const reservasDelClubResp = await axiosInstance.get<ReservasDelClubResponse>(
    urlConParametros
  );
  if (reservasDelClubResp) {
    if (reservasDelClubResp.status === 200) {
      return reservasDelClubResp.data;
    } else {
      return reservasDelClubResp.data;
    }
  } else {
    return null;
  }
};

export const postAgendarReservaDelClub = async (
  agendarReservaDto: AgendarReservaClubDto
) => {
  const url = reservas.agendarReservasDelClub;

  const agendarReservasResp =
    await axiosInstance.post<AgendarReservaClubResponse>(
      url,
      agendarReservaDto
    );
  if (agendarReservasResp) {
    if (agendarReservasResp.status === 200) {
      return agendarReservasResp.data;
    } else {
      return agendarReservasResp.data;
    }
  } else {
    return null;
  }
};

export const eliminarReservaDelClub = async (idReserva: number) => {
  const url = reservas.eliminarReservasDelClub;
  const params = {
    idReserva,
  };

  const deleteReservaResp = await axiosInstance.delete<ReservasDelClubResponse>(
    url,
    { params }
  );
  if (deleteReservaResp) {
    if (deleteReservaResp.status === 200) {
      return deleteReservaResp.data;
    } else {
      return deleteReservaResp.data;
    }
  } else {
    return null;
  }
};

export const postAgregarReservaAVenta = async (reserva: ReservasClub) => {
  const url = reservas.postAgregarReservaVenta;

  const reservaParse: AgregarReservaAVentaDto = {
    reservas: [
      {
        estado: false,
        idInscripcion: null,
        idReserva: reserva.idClienteReserva,
        idSocioCuota: null,
        monto: 0,
      },
    ],
  };
  const agendarReservasResp = await axiosInstance.post<SuccessResponse>(
    url,
    reservaParse
  );
  if (agendarReservasResp) {
    if (agendarReservasResp.status === 200) {
      return agendarReservasResp.data;
    } else {
      return agendarReservasResp.data;
    }
  } else {
    return null;
  }
  return null;
};
