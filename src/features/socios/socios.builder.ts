// import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
// import { SociosState } from "./socios.slice"
// import { fetchNominaSocios } from "./sociosThunk"

// export const fetchNominaSociosBuilder = (builder:ActionReducerMapBuilder<SociosState>) =>{
// 	builder.addCase(fetchNominaSocios.pending, (state) => {
// 		state.loadingNominaSocios = true
// 	})
// 	builder.addCase(fetchNominaSocios.fulfilled, (state, action) => {
// 			state.loadingNominaSocios = false
// 			state.nominaSocios =  action.payload ? action.payload.sociosFormateados:[]
// 	})
// 	builder.addCase(fetchNominaSocios.rejected, (state) => {
// 			state.loadingNominaSocios = false
// 	})
// }