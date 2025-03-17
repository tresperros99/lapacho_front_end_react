import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TipoSocio } from "../../models/responses/socios/TipoSocio.response";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

export interface SociosState {
  nominaSocios: Socio[];
  tipoSocios: TipoSocio[];
}

const initialState: SociosState = {
  nominaSocios: [],
  tipoSocios: [],
};

export const sociosSlice = createSlice({
  name: "profesores",
  initialState,
  reducers: {
    clearSocios: () => {
      return {
        ...initialState,
      };
    },
    setNominaSocios: (state, action: PayloadAction<Socio[]>) => {
      state.nominaSocios = action.payload;
    },

    setTipoSocios: (state, action: PayloadAction<TipoSocio[]>) => {
      state.tipoSocios = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNominaSocios, clearSocios, setTipoSocios } =
  sociosSlice.actions;

export default sociosSlice.reducer;
