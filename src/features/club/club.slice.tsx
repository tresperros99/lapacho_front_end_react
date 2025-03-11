import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MesasDisponible } from "../../models/responses/clases/MesasDisponibles.response";

export interface clubState {
  mesasDisponibles: MesasDisponible[];
}

const initialState: clubState = {
  mesasDisponibles: [],
};

export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    clearClub: () => {
      return {
        ...initialState,
      };
    },
    setMesasDisponible: (state, action: PayloadAction<MesasDisponible[]>) => {
      state.mesasDisponibles = action.payload;
    },
  },
});

export const { clearClub, setMesasDisponible } = clubSlice.actions;

export default clubSlice.reducer;
