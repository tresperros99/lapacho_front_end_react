import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNominaSocios } from "../../api/ApiSocios";
export const fetchNominaSocios = createAsyncThunk(
	'profesores/getNominaSocios',
	async () => {
		// TODO: axios llamada a funcion
    const res = await getNominaSocios();
		return res;
	}
)