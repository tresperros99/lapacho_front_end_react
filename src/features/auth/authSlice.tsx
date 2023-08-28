import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchLoginBuilder } from './auth.builder';

export interface AuthState {
	token: string | null;
	loadingToken: boolean;
}

const initialState: AuthState = {
	token: null,
	loadingToken: false,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
	setToken: (state, action: PayloadAction<string>) => {
	  	state.token = action.payload
	},
  },
  extraReducers:fetchLoginBuilder
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export default authSlice.reducer