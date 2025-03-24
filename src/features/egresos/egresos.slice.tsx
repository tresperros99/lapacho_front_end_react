import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TiposEgreso } from "../../models/responses/egresos/TipoEgreso.response";

export interface EgresosState {
  tiposEgresos: TiposEgreso[];
}

const initialState: EgresosState = {
  tiposEgresos: [],
};

export const egresosSlice = createSlice({
  name: "egresos",
  initialState,
  reducers: {
    clearEgresos: () => {
      return {
        ...initialState,
      };
    },
    setTiposEgresos: (state, action: PayloadAction<TiposEgreso[]>) => {
      state.tiposEgresos = action.payload;
    },
  },
});

export const { clearEgresos, setTiposEgresos } = egresosSlice.actions;

export default egresosSlice.reducer;
