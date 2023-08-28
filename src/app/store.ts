import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import authSlice from '../features/auth/authSlice'
import { useDispatch } from 'react-redux/es/exports'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch