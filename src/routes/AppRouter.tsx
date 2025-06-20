import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootState } from "../app/store";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ErrorSnackbar from "../components/genericos/ErrorSnackbar";
import SuccesSnackbar from "../components/genericos/SuccesSnackbar";
export const AppRouter = () => {
  const loginResponse = useSelector(
    (state: RootState) => state.auth.loginResponse,
  );

  return (
    <BrowserRouter>
      <Routes>
        {loginResponse?.token ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <SuccesSnackbar />
      <ErrorSnackbar />
    </BrowserRouter>
  );
};

export default AppRouter;
