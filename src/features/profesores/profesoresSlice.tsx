import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProfesoresFormateado } from "../../models/responses/profesores/NominaProfesores.response";
import { fetchNominaProfesoresBuilder } from "./profesores.builder";

export interface ProfesoresState {
  nominaProfesores: ProfesoresFormateado[];
  loadingNominaProfesores: boolean;
}

const initialState: ProfesoresState = {
  nominaProfesores: [],
  loadingNominaProfesores: false,
};

export const profesoresSlice = createSlice({
  name: "profesores",
  initialState,
  reducers: {
    setNominaProfesores: (
      state,
      action: PayloadAction<ProfesoresFormateado[]>,
    ) => {
      state.nominaProfesores = action.payload;
    },
    clearProfesores: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: fetchNominaProfesoresBuilder,
});

// Action creators are generated for each case reducer function
export const { setNominaProfesores, clearProfesores } = profesoresSlice.actions;

export default profesoresSlice.reducer;
