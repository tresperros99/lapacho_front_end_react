import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchLoginBuilder } from './auth.builder';
import LoginResponse from '../../models/responses/Auth/Login.response';
import { AccesosDisponible } from '../../models/responses/Auth/ObtenerAccesos.response';

export interface AuthState {
	loginResponse: LoginResponse | null;
	loadingToken: boolean;
	accesosUsuario: AccesosDisponible[];
}

const initialState: AuthState = {
	loginResponse: null,
	loadingToken: false,
	accesosUsuario:[],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
	setToken: (state, action: PayloadAction<LoginResponse>) => {
		state.loginResponse = action.payload
	},
	setAccesoUsuarios: (state, action: PayloadAction<AccesosDisponible[]>) => {
		state.accesosUsuario = action.payload
	},
	clearAuth:()=>{
		return {
			...initialState
		}
	}
  },
  extraReducers:fetchLoginBuilder
})

// Action creators are generated for each case reducer function
export const { setToken, setAccesoUsuarios,clearAuth } = authSlice.actions

export default authSlice.reducer