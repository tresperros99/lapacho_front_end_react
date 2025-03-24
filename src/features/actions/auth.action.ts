import { getAccesosUsuario } from "../../api/ApiAuth";
import { AppThunk } from "../../app/store";
import { setAccesoUsuarios } from "../auth/authSlice";
import { setError, setLoadigAccesosUsuario } from "../ui/ui.slice";

export const fetchAccesosUsuario =
  (): AppThunk => async (dispatch, getState) => {
    const { auth, ui } = getState();
    const { accesosUsuario } = auth;
    const { loadingAccesosUsuario } = ui;

    if (loadingAccesosUsuario || accesosUsuario.length > 0) return;

    dispatch(setLoadigAccesosUsuario(true));

    try {
      const accesosUsuarioResp = await getAccesosUsuario();
      if (
        accesosUsuarioResp &&
        accesosUsuarioResp.accesosDisponibles.length > 0
      ) {
        dispatch(setAccesoUsuarios(accesosUsuarioResp.accesosDisponibles));
      }
    } catch (error) {
      dispatch(setError("Error al cargar los accesos de usuario"));
    } finally {
      dispatch(setLoadigAccesosUsuario(false));
    }
  };
