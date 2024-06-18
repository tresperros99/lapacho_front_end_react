const appConfig = {
	auth: {
		login: 'auth/login'
	},
	profesores: {
		profesores: 'profesores'
	},
	socios: {
        socios: 'socio',
        buscadorSocio:'/socio/obtener_socios'
	},
	ingresos: {
		cargarIngresos: '/ingresos/agregar_ingreso',
		obtenerIngresos: '/ingresos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&pagina=${pagina}',
		obtenerExcelIngresos: '/ingresos/reportes_ingresos_excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}'
	},
	egresos: {
		listarTipoEgresos: '/egresos/tipos_egreso',
		cargarEgresos: '/egresos/agregar_gasto',
		obtenerEgresos: '/egresos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&pagina=${pagina}',
		obtenerExcelEgresos: '/egresos/reportes_egresos_excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}'
	},
	cuotas: {
        getListadoCuotasPendientesSocio:'/cuotas_club/cuota_socio',
        pagarCuotaSocio: '/pagos_socio/socio/pagar_cuota_varias',
        pagarCuotasSociosVarias: '/pagos_socio/socio/pagar_cuota_varias',
        getListadocuotasPendientesMes: 'cuotas_club/cuotas_pendientes_mes',
        getCuotasPagadasDelMes: '/cuotas_club/cuotas_pagadas_mes',
        getGrillaDeCuotasExcel: '/cuotas_club/cuotas_reporte'
    },
    eventos: {
        obtenerEventosDelMes: '/calendario_eventos/eventos_mes',
        obtenerEventosDelAnio: '/calendario_eventos/eventos_annio',
        obtenerTodosEventosClub: '/calendario_eventos/eventos_mes_todos',
        obtenerTipoEventos:'/calendario_eventos/obtener_tipos_evento',
        crearEvento: '/calendario_eventos/crear_nuevo_evento'
    },
    reservas: {
        getReservasDelClub: '/reserva_en_club/obtener_reservas_club',
        agendarReservasDelClub: '/reserva_en_club/crear_reserva_club'
    },
    clases: {
        agendarClae: '/agendamiento_clases/agendar_clase',
        getMesasDisponibles:'/reserva_en_club/obtener_mesas_disponibles'

    }
}

export default appConfig;