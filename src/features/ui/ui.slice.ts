import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UiState {
    loadingTipoIngreso: boolean;
    error:string
}

const initialState: UiState = {
    loadingTipoIngreso: false,
    error:''
}


export const uiSlice = createSlice({
    name: 'profesores',
    initialState,
    reducers: {
        clearUi: () => {
            return {
                ...initialState
            }
        },
        setLoadingTipoIngreso: (state, action: PayloadAction<boolean>) => {
            state.loadingTipoIngreso = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})


export const { clearUi, setLoadingTipoIngreso,setError } = uiSlice.actions

export default uiSlice.reducer