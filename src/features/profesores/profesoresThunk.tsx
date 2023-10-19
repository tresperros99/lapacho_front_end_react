import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNominaProfesores } from "../../api/ApiProfesores";
export const fetchNominaProfesores = createAsyncThunk(
	'profesores/getNominaProfesores',
	async () => {
		// TODO: axios llamada a funcion
		const res = await getNominaProfesores();
		return res;
	}
)