import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainLayout from '../layouts/MainLayout';
export const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <MainLayout><HomePage/></MainLayout>} />
        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default PrivateRoutes;