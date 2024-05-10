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
export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout> <HomePage /> </MainLayout>} />
            <Route path='formProfesor' element={<MainLayout><FormProfesores /></MainLayout>} />
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