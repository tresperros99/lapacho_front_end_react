import AbrirCaja from "../pages/caja/AbrirCaja";
import CajaCarrito from "../pages/caja/CajaCarrito";
import CerrarCaja from "../pages/caja/CerrarCaja";
import ResumenXFecha from "../pages/caja/ResumenXFecha";
import FormClases from "../pages/clases/FormClases";
import PanelClases from "../pages/clases/PanelClases";
import FormClientes from "../pages/clientes/FormClientes";
import FormCompras from "../pages/compras/FormCompras";
import PanelCompras from "../pages/compras/PanelCompras";
import DashboardProfesores from "../pages/dashboards/DashboardProfesores";
import DashboardSociosClientes from "../pages/dashboards/DashboardSociosClientes";
import FormEgresos from "../pages/egresos/FormEgresos";
import PanelEgresos from "../pages/egresos/PanelEgresos";
import FormEventos from "../pages/eventos/FormEventos";
import FormInscripciones from "../pages/eventos/inscripciones/FormInscripciones";
import PanelInscripciones from "../pages/eventos/inscripciones/PanelInscipciones";
import PanelEventos from "../pages/eventos/PanelEventos";
import CargarTalonario from "../pages/facturacion/CargarTalonario";
import HomePage from "../pages/HomePage";
import FormIngresos from "../pages/ingresos/FormIngresos";
import PanelIngresos from "../pages/ingresos/PanelIngresos";
import FormProfesores from "../pages/profesores/FormProfesores";
import PanelProfesores from "../pages/profesores/PanelProfesores";
import FormReservas from "../pages/reservas/FormReservas";
import PanelReservas from "../pages/reservas/PanelReservas";
import { FormSocioDependiente } from "../pages/socios";
import FormSocios from "../pages/socios/FormSocios";
import FormUsuarios from "../pages/socios/FormUsuarios";
import CuotasPagadas from "../pages/socios/miSocio/CuotasPagadas";
import CuotasPagadasDelMes from "../pages/socios/miSocio/CuotasPagadasDelMes";
import CuotasPendientes from "../pages/socios/miSocio/CuotasPendientes";
import CuotasPendientesMes from "../pages/socios/miSocio/CuotasPendientesMes";
import PanelSocios from "../pages/socios/PanelSocios";

export const commonRoutes = [
  { path: "/", Component: HomePage },
  { path: "cuotasPendientes", Component: CuotasPendientes },
  { path: "cuotasPagadas", Component: CuotasPagadas },
  { path: "cuotasAtrasadas", Component: PanelProfesores },
  { path: "cuotasPendientesMes", Component: CuotasPendientesMes },
  { path: "cuotasPagadasMes", Component: CuotasPagadasDelMes },
  { path: "crearReserva", Component: FormReservas },
];

export const adminRoutes = [
  { path: "formProfesor", Component: FormProfesores },
  { path: "panelProfesor", Component: PanelProfesores },
  { path: "formClases", Component: FormClases },
  { path: "panelClases", Component: PanelClases },
  { path: "formSocios", Component: FormSocios },
  { path: "formClientes", Component: FormClientes },

  { path: "formSocioDependiente", Component: FormSocioDependiente },

  { path: "panelSocios", Component: PanelSocios },
  { path: "ingresos", Component: FormIngresos },
  { path: "panelIngresos", Component: PanelIngresos },
  { path: "egresos", Component: FormEgresos },
  { path: "panelEgresos", Component: PanelEgresos },
  { path: "cajaCarrito", Component: CajaCarrito },
  { path: "panelReservas", Component: PanelReservas },
  { path: "cargarTalonario", Component: CargarTalonario },
  { path: "formEventos", Component: FormEventos },
  { path: "dashboardSociosClientes", Component: DashboardSociosClientes },
  { path: "dashboardProfesores", Component: DashboardProfesores },
  { path: "abrirCaja", Component: AbrirCaja },
  { path: "cerrarCaja", Component: CerrarCaja },
  { path: "resumenXFecha", Component: ResumenXFecha },
  { path: "panelEventos", Component: PanelEventos },
  { path: "inscripcionEvento", Component: FormInscripciones },
  { path: "formUsuarios", Component: FormUsuarios },
  { path: "formCompras", Component: FormCompras },
  { path: "panelCompras", Component: PanelCompras },
  { path: "panelInscripciones", Component: PanelInscripciones },
];

export const profesoresRoutes = [];
