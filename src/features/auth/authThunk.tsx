import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/ApiAuth";
import { LoginDto } from "../../models/dtos/LoginDto.models";
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (loginData: LoginDto) => {
    const res = await login(loginData.usuario, loginData.contraseña);
    return res;
  },
);
