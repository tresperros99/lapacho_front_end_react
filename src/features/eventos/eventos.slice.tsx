import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TiposEvento } from "../../models/responses/eventos/TipoEvento.response";

export interface EgresosState {
  tipoEvento: TiposEvento[];
}

const initialState: EgresosState = {
    tipoEvento: [],
};

export const eventosSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {
    clearEventos: () => {
      return {
        ...initialState,
      };
    },
    setTipoEventos: (state, action: PayloadAction<TiposEvento[]>) => {
      state.tipoEvento = action.payload;
    },
  },
});

export const { clearEventos, setTipoEventos } = eventosSlice.actions;

export default eventosSlice.reducer;
