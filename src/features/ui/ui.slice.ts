import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UiState {
  loadingTipoIngreso: boolean;
  loadingTipoEgreso: boolean;
  loadingAccesosUsuario: boolean;
  loadingTipoSocios: boolean;
  loadingMesasDisponibles: boolean;
  loadingTipoPago: boolean;
  loadingTipoEvento: boolean,
  error: string;
  successMessage: string;
}

const initialState: UiState = {
  loadingTipoIngreso: false,
  loadingTipoEgreso: false,
  loadingAccesosUsuario: false,
  loadingTipoSocios: false,
  loadingMesasDisponibles: false,
  loadingTipoPago: false,
  loadingTipoEvento: false,
  error: "",
  successMessage: "",
};

export const uiSlice = createSlice({
  name: "profesores",
  initialState,
  reducers: {
    clearUi: () => {
      return {
        ...initialState,
      };
    },
    setLoadingTipoIngreso: (state, action: PayloadAction<boolean>) => {
      state.loadingTipoIngreso = action.payload;
    },
    setLoadingTipoEgreso: (state, action: PayloadAction<boolean>) => {
      state.loadingTipoEgreso = action.payload;
    },
    setLoadigAccesosUsuario: (state, action: PayloadAction<boolean>) => {
      state.loadingAccesosUsuario = action.payload;
    },
    setLoadingTipoSocios: (state, action: PayloadAction<boolean>) => {
      state.loadingTipoSocios = action.payload;
    },
    setLoadingMesasDisponibles: (state, action: PayloadAction<boolean>) => {
      state.loadingMesasDisponibles = action.payload;
    },
    setLoadingTipoPago: (state, action: PayloadAction<boolean>) => {
      state.loadingTipoPago = action.payload;
    },
    setLoadingTipoEvento: (state, action: PayloadAction<boolean>) => {
      state.loadingTipoEvento = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = initialState.error;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    clearSuccess: (state) => {
      state.successMessage = initialState.successMessage;
    },
  },
});

export const {
  clearUi,
  setLoadingTipoIngreso,
  setLoadigAccesosUsuario,
  setLoadingTipoEgreso,
  setLoadingTipoSocios,
  setLoadingMesasDisponibles,
  setLoadingTipoPago,
  setLoadingTipoEvento,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
} = uiSlice.actions;

export default uiSlice.reducer;
