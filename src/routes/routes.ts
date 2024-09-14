// routes.ts

import HomePage from '../pages/HomePage';
import FormProfesores from '../pages/profesores/FormProfesores';
import PanelProfesores from '../pages/profesores/PanelProfesores';
import FormSocios from '../pages/socios/FormSocios';
import PanelSocios from '../pages/socios/PanelSocios';
import FormIngresos from '../pages/ingresos/FormIngresos';
import PanelIngresos from '../pages/ingresos/PanelIngresos';
import FormEgresos from '../pages/egresos/FormEgresos';
import PanelEgresos from '../pages/egresos/PanelEgresos';
import CuotasPendientes from '../pages/socios/miSocio/CuotasPendientes';
import CuotasPagadas from '../pages/socios/miSocio/CuotasPagadas';
import PagoDeCuotas from '../pages/socios/miSocio/PagoDeCuotas';
import CuotasPendientesMes from '../pages/socios/miSocio/CuotasPendientesMes';
import CuotasPagadasDelMes from '../pages/socios/miSocio/CuotasPagadasDelMes';
import FormClases from '../pages/clases/formClases';

export const commonRoutes = [
    { path: '/', Component: HomePage },
    { path: 'cuotasPendientes', Component: CuotasPendientes },
    { path: 'cuotasPagadas', Component: CuotasPagadas },
    { path: 'pagoDeCuotas', Component: PagoDeCuotas },
    { path: 'cuotasAtrasadas', Component: PanelProfesores },
    { path: 'cuotasPendientesMes', Component: CuotasPendientesMes },
    { path: 'cuotasPagadasMes', Component: CuotasPagadasDelMes},
  ];
  
  export const adminRoutes = [
    { path: 'formProfesor', Component: FormProfesores  },
    { path: 'panelProfesor', Component: PanelProfesores },
    { path: 'formClases', Component: FormClases },
    { path: 'panelClases', Component: PanelProfesores },
    { path: 'formSocios', Component: FormSocios  },
    { path: 'panelSocios', Component: PanelSocios  },
    { path: 'ingresos', Component: FormIngresos },
    { path: 'panelIngresos', Component: PanelIngresos },
    { path: 'egresos', Component: FormEgresos  },
    { path: 'panelEgresos', Component: PanelEgresos},
  ];
  
  export const socioRoutes = [
    // { path: 'cuotasPendientes', Component: CuotasPendientes },
    // { path: 'cuotasPagadas', Component: CuotasPagadas },
    // { path: 'pagoDeCuotas', Component: PagoDeCuotas },
    // { path: 'cuotasAtrasadas', Component: PanelProfesores },
    // { path: 'cuotasPendientesMes', Component: CuotasPendientesMes },
    // { path: 'cuotasPagadasMes', Component: CuotasPagadasDelMes},
    // Otras rutas exclusivas de SOCIO
  ];
  