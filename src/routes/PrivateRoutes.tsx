// PrivateRoutes.tsx
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { RootState } from "../app/store";
import { commonRoutes, adminRoutes, socioRoutes } from "./routes";
import { role } from "../helpers/constants";

export const PrivateRoutes = () => {
  const loginResponse = useSelector(
    (state: RootState) => state.auth.loginResponse,
  );

  const roleSpecificRoutes =
    loginResponse?.acceso.tipoUsuario === role.Admin
      ? adminRoutes
      : socioRoutes;
  const allPrivateRoutes = [...commonRoutes, ...roleSpecificRoutes];

  return (
    <MainLayout>
      <Routes>
        {allPrivateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
