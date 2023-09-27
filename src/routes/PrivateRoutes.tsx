import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainLayout from '../layouts/MainLayout';
import FormProfesores from '../pages/profesores/FormProfesores';
export const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <MainLayout><HomePage/></MainLayout>} />
        <Route path='profesores' element={ <MainLayout><FormProfesores/></MainLayout>} />
        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default PrivateRoutes;