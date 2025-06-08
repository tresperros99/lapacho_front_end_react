import { getTipoEventos } from "../../api/ApiEventos";
import { AppThunk } from "../../app/store";
import { setTipoEventos } from "../eventos/eventos.slice";
import { setError, setLoadingTipoEvento } from "../ui/ui.slice";


export const fetchTipoEvento = (): AppThunk => async (dispatch, getState) => {
  const { eventos } = getState();
  const { tipoEvento } = eventos;

  if (!tipoEvento.length) {
    dispatch(setLoadingTipoEvento(true));
    try {
      const tipoEventoResp = await getTipoEventos();
      if (tipoEventoResp && tipoEventoResp.tiposEventos.length > 0) {
        dispatch(setTipoEventos(tipoEventoResp.tiposEventos));
      }
    } catch (error) {
      dispatch(setError("Error al cargar los tipos de egresos."));
    }
  }
  dispatch(setLoadingTipoEvento(false));
};