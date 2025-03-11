import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchNominaProfesores = createAsyncThunk(
  "profesores/getNominaProfesores",
  async () => {
    // TODO: axios llamada a funcion
    const res = true;
    return res;
  }
);
