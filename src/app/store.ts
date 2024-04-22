import { Action, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import authSlice from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import egresosSlice from '../features/egresos/egresos.slice';
import ingresosSlice from '../features/ingresos/ingresos.slice';
import profesoresSlice from '../features/profesores/profesoresSlice';
import sociosSlice from '../features/socios/socios.slice';
import uiSlice from '../features/ui/ui.slice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authSlice,
		profesores: profesoresSlice,
		socios: sociosSlice,
		ingresos: ingresosSlice,
		egresos: egresosSlice,
		ui: uiSlice
	},
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
