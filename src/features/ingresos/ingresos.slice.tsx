import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TiposIngreso } from "../../models/responses/ingresos/TipoIngreso.response";

export interface IngresosState {
  tiposIngresos: TiposIngreso[];
}

const initialState: IngresosState = {
  tiposIngresos: [],
};

export const ingresosSlice = createSlice({
  name: "profesores",
  initialState,
  reducers: {
    clearIngresos: () => {
      return {
        ...initialState,
      };
    },
    setTiposIngresos: (state, action: PayloadAction<TiposIngreso[]>) => {
      state.tiposIngresos = action.payload;
    },
  },
});

export const { clearIngresos, setTiposIngresos } = ingresosSlice.actions;

export default ingresosSlice.reducer;
