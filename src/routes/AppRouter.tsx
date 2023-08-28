import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../app/store";

export const AppRouter = () => {
    const { token} = useSelector((state:RootState)=> state.auth);
  return (
    <BrowserRouter>
        <Routes>
            {
                // TODO: Validar con token creado en el redux
                token
                ? <Route path="/*" element={<PrivateRoutes />} />
                : <Route path='/*' element={<PublicRoutes />} />
            }
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;