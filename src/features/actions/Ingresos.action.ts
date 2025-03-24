import { AppThunk } from "../../app/store";
import axiosInstance from "../../axiosInstance";
import TipoIngresoResponse from "../../models/responses/ingresos/TipoIngreso.response";
import { setTiposIngresos } from "../ingresos/ingresos.slice";
import { setError, setLoadingTipoIngreso } from "../ui/ui.slice";

export const fetchTiposIngresos =
  (): AppThunk => async (dispatch, getState) => {
    const { ingresos } = getState();
    const { tiposIngresos } = ingresos;

    if (!tiposIngresos.length) {
      dispatch(setLoadingTipoIngreso(true));
      try {
        const response = await axiosInstance.get<TipoIngresoResponse>(
          "/ingresos/tipos_ingreso",
        );
        dispatch(setTiposIngresos(response.data.tiposIngreso));
      } catch (error) {
        dispatch(setError("Error al cargar los tipos de ingreso."));
      }
    }
    dispatch(setLoadingTipoIngreso(false));
  };
