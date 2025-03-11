import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TiposPago } from "../../models/responses/caja/ObtenerTipoPago.response";

export interface clubState {
  tipoPago: TiposPago[];
}

const initialState: clubState = {
  tipoPago: [],
};

export const cajaSlice = createSlice({
  name: "caja",
  initialState,
  reducers: {
    clearCaja: () => {
      return {
        ...initialState,
      };
    },
    setTipoPago: (state, action: PayloadAction<TiposPago[]>) => {
      state.tipoPago = action.payload;
    },
  },
});

export const { clearCaja, setTipoPago } = cajaSlice.actions;

export default cajaSlice.reducer;
