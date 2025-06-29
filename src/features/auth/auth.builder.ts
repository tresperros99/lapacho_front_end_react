import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "./authSlice";
import { fetchLogin } from "./authThunk";

export const fetchLoginBuilder = (
  builder: ActionReducerMapBuilder<AuthState>,
) => {
  builder.addCase(fetchLogin.pending, (state) => {
    state.loadingToken = true;
  });
  builder.addCase(fetchLogin.fulfilled, (state, action) => {
    state.loadingToken = false;
    state.loginResponse = action.payload ? action.payload : null;
  });
  builder.addCase(fetchLogin.rejected, (state) => {
    state.loadingToken = false;
  });
};
