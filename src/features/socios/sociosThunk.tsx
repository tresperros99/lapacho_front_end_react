import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNominaSocios } from "../../api/ApiSocios";
export const fetchNominaSocios = createAsyncThunk(
  "profesores/getNominaSocios",
  async () => {
    const res = await getNominaSocios();
    return res;
  },
);
