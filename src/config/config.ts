const appConfig = {
  auth: {
    login: "auth/login",
    obtenerAccesos: "/accesos/obtener_accesos",
    crearUsuario: "/usuarios/crear_socio_usuario",
  },
  profesores: {
    crearProfesor: "profesores",
    obtenerProfesores: "/profesores",
    eliminarProfesor: "/profesores",
    buscadorProfesores: "/profesores/cedula/nombre",
  },
  clientes:{
    crearClientes:"/cliente/crear_cliente"
  },
  socios: {
    crearSocios: "/socio/crear_socio",
    crearSocioDependiente: "/socio/crear_socio_dependientes",
    buscadorSocio: "/socio/obtener_socios",
    tipoSocios: "/socio/obtener_tipo_socios",
    obtenerSocios: "/socio/obtener_socios",
  },
  ventas: {
    generVentaCuotas: "/ventas/socio/generar_venta_cuota_varias",
    obtenerVentasClientes: "/ventas/cliente/obtener_venta_clientes",
  },
  ingresos: {
    cargarIngresos: "/ingresos/agregar_ingreso",
    obtenerIngresos:
      "/ingresos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&pagina=${pagina}",
    obtenerExcelIngresos:
      "/ingresos/reportes_ingresos_excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}",
  },
  egresos: {
    listarTipoEgresos: "/egresos/tipos_egreso",
    cargarEgresos: "/egresos/agregar_gasto",
    obtenerEgresos:
      "/egresos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&pagina=${pagina}",
    obtenerExcelEgresos:
      "/egresos/reportes_egresos_excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}",
  },
  cuotas: {
    getListadoCuotasPendientesSocio: "/cuotas_club/cuota_socio",
    pagarCuotaSocio: "/pagos_socio/socio/pagar_cuota_varias",
    pagarCuotasSociosVarias: "/pagos_socio/socio/pagar_cuota_varias",
    getListadocuotasPendientesMes: "cuotas_club/cuotas_pendientes_mes",
    getCuotasPagadasDelMes: "/cuotas_club/cuotas_pagadas_mes",
    getGrillaDeCuotasExcel: "/cuotas_club/cuotas_reporte",
  },
  eventos: {
    obtenerEventosDelMes: "/calendario_eventos/eventos_mes",
    obtenerEventosDelAnio: "/calendario_eventos/eventos_annio",
    obtenerTodosEventosClub: "/calendario_eventos/eventos_mes_todos",
    obtenerTipoEventos: "/calendario_eventos/obtener_tipos_evento",
    crearEvento: "/calendario_eventos/crear_nuevo_evento",
    obtenerEventosPorFecha: "/calendario_eventos/obtener_torneos_x_fecha",
    obtenerEventosConCategoria:"/calendario_eventos/eventos_con_categoria",
    inscripcionEvento:"/inscripciones/inscribirse_a_evento",
    categoriasEvento:"/calendario_eventos/obtener_categorias_evento",
    obtenerInscripcionesEvento:"/inscripciones/ver_inscripciones_x_evento",
    agregarInscripcionAVenta: "/inscripciones/agregar_inscripciones_a_venta",

  },
  reservas: {
    getReservasDelClub:
      "/reserva_en_club/obtener_reservas_club?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}&pagina=${pagina}",
    agendarReservasDelClub: "/reserva_en_club/crear_reserva_club",
    eliminarReservasDelClub: "/reserva_en_club/borrar_reserva_club",
    postAgregarReservaVenta: "/reserva_en_club/agregar_reserva_a_venta",
  },
  clases: {
    agendarClae: "/agendamiento_clases/agendar_clase",
    getMesasDisponibles: "/reserva_en_club/obtener_mesas_disponibles",
    obtenerClasesPorFecha:'/agendamiento_clases/obtener_clases_x_fecha',
    cancelarClase: "/agendamiento_clases/cancelar_clase",
  },
  caja: {
    crearCaja: "/caja/crear_caja",
    cerrarCaja: "/caja/cerrar_caja",
    generarMovimientoCajaVenta: "/caja/generar_movimientos_de_caja/ventas",
    obtenerTipoPago: "/caja/obtener_tipos_pago",
    obtenerResumenXFecha:'/caja/obtener_movimientos_caja'
  },
  facturacion: {
    crearTalonario: "/facturacion/generar_documentos_factura",
    obtenerUltimoNumeroFactura: "/facturacion/obtener_ultimo_nro_factura",
  },
  compras: {
   generarComprasClub: "/compras/generar_compras_club", 
   obtenerComprasClub: "/compras/obtener_compras_club",
  }
};

export default appConfig;
