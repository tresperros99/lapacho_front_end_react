import { getTiposPago } from "../../api/ApiCaja";
import { AppThunk } from "../../app/store";
import { setTipoPago } from "../caja/caja.slice";
import {
  setError,
  setLoadingMesasDisponibles,
  setLoadingTipoPago,
} from "../ui/ui.slice";

export const fetchTipoPago = (): AppThunk => async (dispatch, getState) => {
  const { caja, ui } = getState();
  const { tipoPago } = caja;
  const { loadingTipoPago } = ui;

  if (loadingTipoPago || tipoPago.length > 0) return;

  dispatch(setLoadingTipoPago(true));

  try {
    const tipoPagoResp = await getTiposPago();
    if (tipoPagoResp && tipoPagoResp.tiposPago.length > 0) {
      dispatch(setTipoPago(tipoPagoResp.tiposPago));
    }
  } catch (error) {
    dispatch(setError("Error al consultar el tipo pago"));
  } finally {
    dispatch(setLoadingMesasDisponibles(false));
  }
};
