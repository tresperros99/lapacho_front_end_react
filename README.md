# 🏓 Frontend - Sistema de Gestión del Club Lapacho

Este proyecto corresponde al sistema de gestión de socios del **Club Lapacho de Tenis de Mesa**, desarrollado como parte del proyecto final de grado.

El sistema permite administrar socios, reservas, clases, profesores, torneos, caja, facturación, reportes y más, brindando a los administradores una herramienta moderna y accesible para llevar el control general del club.

---

## 🚀 Tecnologías Utilizadas

- **React** (v18+)
- **TypeScript**
- **Vite** (como bundler)
- **MUI (Material UI)** – Para el diseño visual
- **Redux Toolkit** – Manejo de estados globales
- **Axios** – Con interceptores personalizados
- **React Router DOM** – Navegación por rutas
- **Yup + Formik** – Validaciones y manejo de formularios
- **Netlify** – Para el despliegue del frontend

---

## 📦 Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/tuUsuario/lapacho-frontend.git
cd lapacho-frontend
```

2. Instalá las dependencias:

```bash
npm install
```

3. Ejecutá el entorno de desarrollo:

```bash
npm run dev
```

4. Accedé desde tu navegador:

```
http://localhost:5173
```

> Asegurate de tener el backend corriendo en paralelo (ver repositorio del backend).

---

## ⚙️ Scripts Disponibles

| Comando           | Descripción                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Inicia la app en modo desarrollo           |
| `npm run build`   | Genera la versión optimizada de producción |
| `npm run preview` | Sirve localmente la build final            |
| `npm run lint`    | Corre el linter para el código             |

---

## 📁 Estructura del Proyecto

```bash
.
src/
├── api/               # Llamadas a APIs externas o internas
├── app/               # Setup principal de la app (Redux store, providers, etc.)
├── assets/            # Recursos estáticos (imágenes, íconos, etc.)
├── components/        # Componentes reutilizables y UI
├── config/            # Configuraciones generales (env, endpoints)
├── features/          # Slices de Redux + lógica específica
├── helpers/           # Funciones utilitarias y formateadores
├── layouts/           # Diseños generales reutilizables (layouts por rol, etc.)
├── locales/           # Archivos de traducción/localización
├── models/            # Modelos de datos tipados
│   ├── dtos/              # Data Transfer Objects (entrada de datos)
│   ├── responses/         # Tipado de respuestas de API
│   └── types/             # Tipos generales o compartidos
├── pages/             # Vistas principales o rutas renderizables
├── routes/            # Rutas de la app (React Router)

```

---

## 📌 Funcionalidades principales

✅ Login con roles y control de accesos\
✅ Gestión de socios y cuotas automáticas\
✅ Reservas de mesas con disponibilidad\
✅ Organización de clases y asignación de profesores\
✅ Registro de caja y facturación\
✅ Reportes y dashboard de métricas\
✅ Seguridad con tokens y control de sesiones\
✅ UI intuitiva

---

## 🧪 Requisitos

- Node.js v18+
- Navegador moderno (Chrome, Firefox, etc.)
- Acceso a internet (API desplegada en Render)

---

## 🌐 Demo en producción

👉 [proyectolapacho.netlify.app](proyectolapacho.netlify.app)

---

## 👨‍💻 Autor

**Lucas Torres** – *Proyecto Final de Grado*


- 📧 [lucastorres99@hotmail.com](mailto\:lucastorres99@hotmail.com)
- 🤖 [GitHub](https://github.com/tresperros99))

---

## 📄 Licencia

MIT © 2025 – Este proyecto fue desarrollado con fines académicos, pero puede ser extendido o adaptado con fines institucionales para el Club Lapacho.

