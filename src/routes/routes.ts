// routes.ts

import ClasesForm from "../components/calendarEvents/subComponents/ClasesForm";
import CajaCarrito from "../pages/caja/CajaCarrito";
import FormClases from "../pages/clases/FormClases";
import FormEgresos from "../pages/egresos/FormEgresos";
import PanelEgresos from "../pages/egresos/PanelEgresos";
import CargarEventos from "../pages/eventos/CargarEventos";
import CargarTalonario from "../pages/facturacion/CargarTalonario";
import HomePage from "../pages/HomePage";
import FormIngresos from "../pages/ingresos/FormIngresos";
import PanelIngresos from "../pages/ingresos/PanelIngresos";
import FormProfesores from "../pages/profesores/FormProfesores";
import PanelProfesores from "../pages/profesores/PanelProfesores";
import FormReservas from "../pages/reservas/FormReservas";
import PanelReservas from "../pages/reservas/PanelReservas";
import FormSocios from "../pages/socios/FormSocios";
import CuotasPagadas from "../pages/socios/miSocio/CuotasPagadas";
import CuotasPagadasDelMes from "../pages/socios/miSocio/CuotasPagadasDelMes";
import CuotasPendientes from "../pages/socios/miSocio/CuotasPendientes";
import CuotasPendientesMes from "../pages/socios/miSocio/CuotasPendientesMes";
import PagoDeCuotas from "../pages/socios/miSocio/PagoDeCuotas";
import PanelSocios from "../pages/socios/PanelSocios";

export const commonRoutes = [
  { path: "/", Component: HomePage },
  { path: "cuotasPendientes", Component: CuotasPendientes },
  { path: "cuotasPagadas", Component: CuotasPagadas },
  { path: "pagoDeCuotas", Component: PagoDeCuotas },
  { path: "cuotasAtrasadas", Component: PanelProfesores },
  { path: "cuotasPendientesMes", Component: CuotasPendientesMes },
  { path: "cuotasPagadasMes", Component: CuotasPagadasDelMes },
  { path: "crearReserva", Component: FormReservas },
];

export const adminRoutes = [
  { path: "formProfesor", Component: FormProfesores },
  { path: "panelProfesor", Component: PanelProfesores },
  { path: "formClases", Component: ClasesForm },
  { path: "panelClases", Component: PanelProfesores },
  { path: "formSocios", Component: FormSocios },
  { path: "panelSocios", Component: PanelSocios },
  { path: "ingresos", Component: FormIngresos },
  { path: "panelIngresos", Component: PanelIngresos },
  { path: "egresos", Component: FormEgresos },
  { path: "panelEgresos", Component: PanelEgresos },
  { path: "cajaCarrito", Component: CajaCarrito },
  { path: "panelReservas", Component: PanelReservas },
  { path: "cargarTalonario", Component: CargarTalonario },
  { path: "cargarEventos", Component: CargarEventos },
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
