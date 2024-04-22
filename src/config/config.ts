let appConfig = {
    auth: {
        login: 'auth/login'
    },
    profesores:{
        profesores:'profesores'
    },
    socios:{
        socios:'socio'
    },
    ingresos: {
        cargarIngresos: '/ingresos/agregar_ingreso',
        obtenerIngresos:'/ingresos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&pagina=${pagina}'
    },
    egresos: {
        listarTipoEgresos:'/egresos/tipos_egreso',
        cargarEgresos: '/egresos/agregar_gasto',
        obtenerEgresos:'/egresos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&pagina=${pagina}'

    }
}

export default appConfig;