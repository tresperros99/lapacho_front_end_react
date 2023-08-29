import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootState } from "../app/store";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
export const AppRouter = () => {
	const token = useSelector((state:RootState)=> state.auth.token);
	
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