import axiosInstance from "../axiosInstance";
import appConfig from "../config/config";
import AgregarInscipcionAVentaDto from "../models/dtos/eventos/AgregarIncripcionAVentaDto.model";
import InscribirseAEventoDto from "../models/dtos/eventos/InscribirseAEventoDto.model";
import { NuevoEventoDto } from "../models/dtos/eventos/NuevoEventoDto.model";
import ObtenerEventosPorFechaDto from "../models/dtos/eventos/ObtenerEventosPorFechaDto.model";
import TodosEventosClubDto from "../models/dtos/eventos/TodosEventosClubDto.model";
import CrearEventoResponse from "../models/responses/eventos/CrearEventoClub.response";
import EventosDeAnioResponse from "../models/responses/eventos/EventosDelAnio.response";
import EventosDelMesResponse from "../models/responses/eventos/EventosDelMes.response";
import InscripcionesEventosResponse from "../models/responses/eventos/InscripcionesEventos.response";
import ObtenerCategoriasEventosResponse from "../models/responses/eventos/ObtenerCategoriasEventos.response";
import ObtenerEventosConCategoriasResponse from "../models/responses/eventos/ObtenerEventosConCategorias.response";
import ObternerEventosPorFechaResponse from "../models/responses/eventos/ObtenerEventosPorFecha";
import ObtenerTodosEventosClub from "../models/responses/eventos/ObtenerTodosEventosClub";
import TipoEventoResponse from "../models/responses/eventos/TipoEvento.response";
import SuccessResponse from "../models/responses/shared/Success.response";

const { eventos } = appConfig;

export const getEventosDelMes = async (mes: number) => {
  const url = eventos.obtenerEventosDelMes;
  const params = {
    mes,
  };
  const eventosDelMesResp = await axiosInstance.get<EventosDelMesResponse>(
    url,
    { params },
  );
  if (eventosDelMesResp) {
    if (eventosDelMesResp.status === 200) {
      return eventosDelMesResp.data;
    } else {
      return eventosDelMesResp.data;
    }
  } else {
    return null;
  }
};

export const getEventosDelAnio = async () => {
  const url = eventos.obtenerEventosDelAnio;

  const eventosAnioResp = await axiosInstance.get<EventosDeAnioResponse>(url);
  if (eventosAnioResp) {
    if (eventosAnioResp.status === 200) {
      return eventosAnioResp.data;
    } else {
      return eventosAnioResp.data;
    }
  } else {
    return null;
  }
};

export const getTodosEventosDelCLub = async (
  getEventosMesDto: TodosEventosClubDto,
) => {
  const url = eventos.obtenerTodosEventosClub;

  const todosEventosResp = await axiosInstance.post<ObtenerTodosEventosClub>(
    url,
    getEventosMesDto,
  );
  if (todosEventosResp) {
    if (todosEventosResp.status === 200) {
      return todosEventosResp.data;
    } else {
      return todosEventosResp.data;
    }
  } else {
    return null;
  }
};

export const getTipoEventos = async () => {
  const url = eventos.obtenerTipoEventos;

  const tipoEventoResp = await axiosInstance.get<TipoEventoResponse>(url);
  if (tipoEventoResp) {
    if (tipoEventoResp.status === 200) {
      return tipoEventoResp.data;
    } else {
      return tipoEventoResp.data;
    }
  } else {
    return null;
  }
};

export const postCrearEventoClub = async (crearEventoDto: NuevoEventoDto) => {
  const url = eventos.crearEvento;

  const crearEventoResp = await axiosInstance.post<CrearEventoResponse>(
    url,
    crearEventoDto,
  );
  if (crearEventoResp) {
    if (crearEventoResp.status === 200) {
      return crearEventoResp.data;
    } else {
      return crearEventoResp.data;
    }
  } else {
    return null;
  }
};


export const getEventosPorFecha = async (
  getEventosPorFecha: ObtenerEventosPorFechaDto,
) => {
  const url = eventos.obtenerEventosPorFecha;

  const eventosPorFechaResp = await axiosInstance.post<ObternerEventosPorFechaResponse>(
    url,
    getEventosPorFecha,
  );
  if (eventosPorFechaResp) {
    if (eventosPorFechaResp.status === 200) {
      return eventosPorFechaResp.data;
    } else {
      return eventosPorFechaResp.data;
    }
  } else {
    return null;
  }
};


export const getEventosConCategoria = async (
  mes: number,
  annio: number,
) => {

  const params = {
    mes,
    annio
  };
  const url = eventos.obtenerEventosConCategoria;

  const eventosConCategoria = await axiosInstance.get<ObtenerEventosConCategoriasResponse>(
    url,
    { params},
  );
  if (eventosConCategoria) {
    if (eventosConCategoria.status === 200) {
      return eventosConCategoria.data;
    } else {
      return eventosConCategoria.data;
    }
  } else {
    return null;
  }
};


export const postInscribirseAEvento = async (inscribirseAEventoDto: InscribirseAEventoDto) => {

  const url = eventos.inscripcionEvento;

  const inscripcionAEvento = await axiosInstance.post<ObtenerEventosConCategoriasResponse>(
    url,
    inscribirseAEventoDto
  );
  if (inscripcionAEvento) {
    if (inscripcionAEvento.status === 200) {
      return inscripcionAEvento.data;
    } else {
      return inscripcionAEvento.data;
    }
  } else {
    return null;
  }
};


export const getCategoriaEventos = async (
  idEvento: number,
) => {

  const params = {
    id_evento:idEvento,
  };
  const url = eventos.categoriasEvento;

  const categoriaEvento = await axiosInstance.get<ObtenerCategoriasEventosResponse>(
    url,
    { params},
  );
  if (categoriaEvento) {
    if (categoriaEvento.status === 200) {
      return categoriaEvento.data;
    } else {
      return categoriaEvento.data;
    }
  } else {
    return null;
  }
};

export const obtenerInscripcionesEvento = async (
  idEvento: number,
  idCategoria: number,
) => {

  const params = {
    id_evento:idEvento,
    id_categoria:idCategoria,
  };
  const url = eventos.obtenerInscripcionesEvento;

  const inscripcionesAEventos = await axiosInstance.get<InscripcionesEventosResponse>(
    url,
    { params},
  );
  if (inscripcionesAEventos) {
    if (inscripcionesAEventos.status === 200) {
      return inscripcionesAEventos.data;
    } else {
      return inscripcionesAEventos.data;
    }
  } else {
    return null;
  }
};



export const postAgregarInscripcionAVenta = async (AgregarInscipcionAVentaDto: AgregarInscipcionAVentaDto) => {

  const url = eventos.agregarInscripcionAVenta;

  const inscripcionAEvento = await axiosInstance.post<SuccessResponse>(
    url,
    AgregarInscipcionAVentaDto,
  );
  if (inscripcionAEvento) {
    if (inscripcionAEvento.status === 200) {
      return inscripcionAEvento.data;
    } else {
      return inscripcionAEvento.data;
    }
  } else {
    return null;
  }
};