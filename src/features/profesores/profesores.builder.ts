import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { ProfesoresState } from "./profesoresSlice"
import { fetchNominaProfesores } from "./profesoresThunk"

export const fetchNominaProfesoresBuilder = (builder:ActionReducerMapBuilder<ProfesoresState>) =>{
	builder.addCase(fetchNominaProfesores.pending, (state) => {
		state.loadingNominaProfesores = true
	})
	builder.addCase(fetchNominaProfesores.fulfilled, (state) => {
			state.loadingNominaProfesores = false
			state.nominaProfesores =  []
	})
	builder.addCase(fetchNominaProfesores.rejected, (state) => {
			state.loadingNominaProfesores = false
	})
}