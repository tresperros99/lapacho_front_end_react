import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchLoginBuilder } from './auth.builder';
import LoginResponse from '../../models/responses/Auth/Login.response';

export interface AuthState {
	loginResponse: LoginResponse | null;
	loadingToken: boolean;
}

const initialState: AuthState = {
	loginResponse: null,
	loadingToken: false,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
	setToken: (state, action: PayloadAction<LoginResponse>) => {
	  	state.loginResponse = action.payload
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
export const { setToken,clearAuth } = authSlice.actions

export default authSlice.reducer