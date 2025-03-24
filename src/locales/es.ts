export const es = {
  common: {
    buttons: {
      close: "Cerrar",
      create: "Crear",
      update: "Actualizar",
      new: "Nuevo",
    },
    alerts: {
      success: "¡Éxito!",
      error: "¡Error!",
    },
    validation: {
      required: "Este campo es requerido",
    },
    labels: {
      login: {
        login: "Iniciar Sesión",
        email: "Correo",

        password: "Contraseña",
        copyright: "Copyright ©",
      },
    },
    pagination: {
      rowsPerPage: "Filas por página",
      of: "de",
      displaying: "Mostrando",
      to: "a",
      first: "Primera página",
      last: "Última página",
      next: "Siguiente página",
      previous: "Página anterior",
    },
  },
  components: {
    customModal: {
      successTitle: "¡Éxito!",
      errorTitle: "¡Error!",
      closeButton: "Cerrar",
    },
    dashboard: {
      title: "Dashboard",
      copyright: {
        text: "Copyright ©",
        website: "Your Website",
      },
      notifications: "Notificaciones",
      listItems: {
        professors: "Profesores",
        orders: "Órdenes",
        customers: "Clientes",
        reports: "Reportes",
        integrations: "Integraciones",
        secondary: {
          savedReports: "Informes guardados",
          currentMonth: "Mes actual",
          lastQuarter: "Último trimestre",
          yearEndSale: "Venta de fin de año",
        },
      },
    },
    table: {
      headers: {
        actions: "Acciones",
        status: "Estado",
        edit: "Editar",
        delete: "Eliminar",
        name: "Nombre",
        documentId: "Documento",
        contact: "Contacto",
        phone: "Teléfono",
        email: "Correo",
        description: "Descripción",
      },
    },
  },
  pages: {
    profesores: {
      form: {
        title: "Creacion de Profesores",
        fields: {
          name: "Nombre",
          documentId: "Número de cédula",
          hourlyRate: "Precio por Hora",
          password: "Contraseña",
          username: "Nombre de Usuario",
          phone: "Número de teléfono",
        },
        validation: {
          nameRequired: "El nombre es requerido",
          documentRequired: "La Cedula es requerida",
          hourlyRateRequired: "El precio por hora es requerido",
          phoneRequired: "El telefono es requerido",
          usernameRequired: "El usuario es requerido",
          userDisplayNameRequired: "El nombre de usuario es requerido",
          passwordRequired: "La contraseña es requerida",
        },
        buttons: {
          create: "Crear",
          update: "Actualizar",
        },
      },
      panel: {
        title: "Panel de Profesores",
        buttons: {
          new: "Nuevo Profesor",
        },
        tableHeaders: {
          id: "ID",
          name: "Nombre",
          documentId: "Número de Cédula",
          contact: "Contacto",
          hourlyRate: "Costo por Hora",
          status: "Estado",
          edit: "Editar",
          delete: "Eliminar",
        },
        actions: {
          edit: "Editar",
          delete: "Eliminar",
        },
      },
    },
    clases: {
      form: {
        test: "test",
      },
    },
    socios: {
      panel: {
        title: "Panel de Socios",
        buttons: {
          new: "Nuevo Socio",
        },
        tableHeaders: {
          id: "ID",
          name: "Nombre",
          documentId: "Cédula",
          status: "Estado",
          phone: "Número de Teléfono",
          description: "Descripción",
          edit: "Editar",
          delete: "Eliminar",
        },
        actions: {
          edit: "Editar",
          delete: "Eliminar",
        },
      },
    },
  },
};

export default es;
