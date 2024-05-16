import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import FormEgresos from '../pages/egresos/FormEgresos';
import PanelEgresos from '../pages/egresos/PanelEgresos';
import FormIngresos from '../pages/ingresos/FormIngresos';
import PanelIngresos from '../pages/ingresos/PanelIngresos';
import FormProfesores from '../pages/profesores/FormProfesores';
import PanelProfesores from '../pages/profesores/PanelProfesores';
import FormSocios from '../pages/socios/FormSocios';
import PanelSocios from '../pages/socios/PanelSocios';
import CuotasPagadas from '../pages/socios/miSocio/CuotasPagadas';
import CuotasPagadasDelMes from '../pages/socios/miSocio/CuotasPagadasDelMes';
import CuotasPendientes from '../pages/socios/miSocio/CuotasPendientes';
import CuotasPendientesMes from '../pages/socios/miSocio/CuotasPendientesMes';
export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout> <HomePage /> </MainLayout>} />
            <Route path='formProfesor' element={<MainLayout><FormProfesores /></MainLayout>} />
            <Route path='cuotasPendientes' element={<MainLayout><CuotasPendientes /></MainLayout>} />
            <Route path='cuotasPagadas' element={<MainLayout><CuotasPagadas /></MainLayout>} />
            <Route path='cuotasAtrasadas' element={<MainLayout><PanelProfesores /></MainLayout>} />
            <Route path='cuotasPendientesMes' element={<MainLayout><CuotasPendientesMes /></MainLayout>} />
            <Route path='cuotasPagadasMes' element={<MainLayout><CuotasPagadasDelMes /></MainLayout>} />
            <Route path='panelProfesor' element={<MainLayout><PanelProfesores /></MainLayout>} />
            <Route path='formSocios' element={<MainLayout><FormSocios /></MainLayout>} />
            <Route path='panelSocios' element={<MainLayout><PanelSocios /></MainLayout>} />
            <Route path='ingresos' element={<MainLayout><FormIngresos /></MainLayout>} />
            <Route path='panelIngresos' element={<MainLayout><PanelIngresos /></MainLayout>} />
            <Route path='egresos' element={<MainLayout><FormEgresos /></MainLayout>} />
            <Route path='panelEgresos' element={<MainLayout><PanelEgresos /></MainLayout>} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )
}

export default PrivateRoutes;