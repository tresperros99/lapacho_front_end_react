import { getListarTipoDeEgreso } from "../../api/ApiEgresos";
import { AppThunk } from "../../app/store";
import { setTiposEgresos } from "../egresos/egresos.slice";
import { setError, setLoadingTipoEgreso } from "../ui/ui.slice";

export const fetchTiposEgresos = (): AppThunk => async (dispatch, getState) => {
  const { egresos } = getState();
  const { tiposEgresos } = egresos;

  if (!tiposEgresos.length) {
    dispatch(setLoadingTipoEgreso(true));
    try {
      const tipoEgresoResp = await getListarTipoDeEgreso();
      if (tipoEgresoResp && tipoEgresoResp) {
        dispatch(setTiposEgresos(tipoEgresoResp.tiposEgreso));
      }
    } catch (error) {
      dispatch(setError("Error al cargar los tipos de egresos."));
    }
  }
  dispatch(setLoadingTipoEgreso(false));
};
