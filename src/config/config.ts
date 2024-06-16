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
    },
    reservas: {
        getReservasDelClub :'/reserva_en_club/obtener_reservas_club'
    }
}

export default appConfig;