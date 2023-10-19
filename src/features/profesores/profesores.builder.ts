import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { ProfesoresState } from "./profesoresSlice"
import { fetchNominaProfesores } from "./profesoresThunk"

export const fetchNominaProfesoresBuilder = (builder:ActionReducerMapBuilder<ProfesoresState>) =>{
	builder.addCase(fetchNominaProfesores.pending, (state) => {
		state.loadingNominaProfesores = true
	})
	builder.addCase(fetchNominaProfesores.fulfilled, (state, action) => {
			state.loadingNominaProfesores = false
			state.nominaProfesores =  action.payload ? action.payload.profesoresFormateado:[]
	})
	builder.addCase(fetchNominaProfesores.rejected, (state) => {
			state.loadingNominaProfesores = false
	})
}