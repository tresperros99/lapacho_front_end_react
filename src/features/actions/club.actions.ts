import { getMesasDisponibles } from "../../api/ApiClases";
import { AppThunk } from "../../app/store";
import { setMesasDisponible } from "../club/club.slice";
import { setError, setLoadingMesasDisponibles } from "../ui/ui.slice";

export const fetchMesasDisponibles =
  (): AppThunk => async (dispatch, getState) => {
    const { socios, ui } = getState();
    const { tipoSocios } = socios;
    const { loadingTipoSocios } = ui;

    if (loadingTipoSocios || tipoSocios.length > 0) return;

    dispatch(setLoadingMesasDisponibles(true));

    try {
      const mesasDisponibleResp = await getMesasDisponibles();
      if (
        mesasDisponibleResp &&
        mesasDisponibleResp.mesasDisponibles.length > 0
      ) {
        dispatch(setMesasDisponible(mesasDisponibleResp.mesasDisponibles));
      }
    } catch (error) {
      dispatch(setError("Error al cargar los tipos de socios"));
    } finally {
      dispatch(setLoadingMesasDisponibles(false));
    }
  };
