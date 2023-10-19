import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import authSlice from '../features/auth/authSlice'
import { useDispatch } from 'react-redux/es/exports'
import profesoresSlice from '../features/profesores/profesoresSlice'
import sociosSlice from '../features/socios/socios.slice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    profesores: profesoresSlice,
    socios:sociosSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch