import { getTipoSocios } from "../../api/ApiSocios";
import { AppThunk } from "../../app/store";
import { setTipoSocios } from "../socios/socios.slice";
import { setError, setLoadingTipoSocios } from "../ui/ui.slice";

export const fetchTipoSocio = (): AppThunk => async (dispatch, getState) => {
    const { socios, ui } = getState();
    const { tipoSocios } = socios;
    const { loadingTipoSocios } = ui;

    if (loadingTipoSocios || tipoSocios.length > 0) return;

    dispatch(setLoadingTipoSocios(true)); 

    try {
        const tipoSocioResp = await getTipoSocios();
        if (tipoSocioResp && tipoSocioResp.tipoSocio.length > 0) {
            dispatch(setTipoSocios(tipoSocioResp.tipoSocio));
        }
    } catch (error) {
        dispatch(setError('Error al cargar los tipos de socios'));
    } finally {
        dispatch(setLoadingTipoSocios(false));
    }
    
};
