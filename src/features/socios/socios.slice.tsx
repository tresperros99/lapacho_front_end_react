import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SociosFormateado } from '../../models/responses/socios/NominaSocios.response';
import { fetchNominaSociosBuilder } from './socios.builder';
import { TipoSocio } from '../../models/responses/socios/TipoSocio.response';

export interface SociosState {
    nominaSocios: SociosFormateado[],
    tipoSocios: TipoSocio[]
}

const initialState: SociosState = {
	nominaSocios:[],
  tipoSocios:[]
}


export const sociosSlice = createSlice({
  name: 'profesores',
  initialState,
  reducers: {
    clearSocios:()=>{
          return {
              ...initialState
          }
    },
    setNominaSocios: (state, action: PayloadAction<SociosFormateado[]>) => {
        state.nominaSocios = action.payload
    },
    
    setTipoSocios: (state, action: PayloadAction<TipoSocio[]>) => {
      state.tipoSocios = action.payload
    },

  },
  extraReducers:fetchNominaSociosBuilder
})

// Action creators are generated for each case reducer function
export const { setNominaSocios,clearSocios,setTipoSocios } = sociosSlice.actions

export default sociosSlice.reducer