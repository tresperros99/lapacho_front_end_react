import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchNominaProfesores = createAsyncThunk(
  "profesores/getNominaProfesores",
  async () => {
    const res = true;
    return res;
  },
);
