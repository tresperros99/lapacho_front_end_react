import {
  AddOutlinedIcon,
  AttachMoneyIcon,
  CheckBoxOutlinedIcon,
  ClassOutlinedIcon,
  CurrencyExchangeOutlinedIcon,
  DescriptionOutlinedIcon,
  FormatListBulletedOutlinedIcon,
  FormatListNumberedOutlinedIcon,
  GroupAddOutlinedIcon,
  MonetizationOnOutlinedIcon,
  MoneyOffIcon,
  MoneyOffCsredIcon,
  PersonAddOutlinedIcon,
  PriceCheckOutlinedIcon,
  SchoolOutlinedIcon,
  SportsTennisOutlinedIcon,
  InsertDriveFileOutlinedIcon,
  EmojiEventsOutlinedIcon,
  InsertInvitationOutlinedIcon,
  EqualizerOutlinedIcon,
  PersonOutlineOutlinedIcon,
  LocalAtmOutlinedIcon,
  LockOpenOutlinedIcon,
  LockOutlinedIcon,
  AccessibilityIcon,
  FeedOutlinedIcon,
  KeyOutlinedIcon,
  ShoppingCartCheckoutOutlinedIcon,
  AddCardOutlinedIcon,
} from "../../components/icons";

import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { role } from "../../helpers/constants";
import MenuItems from "../../models/types/MenuItemnsTypes";
type OpenState = {
  [key: string]: boolean;
};

export const MainListItems = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<OpenState>({});
  const loginResponse = useSelector(
    (state: RootState) => state.auth.loginResponse,
  );
  const handleClick = (item: string) => {
    setOpen((prev) => ({ ...prev, [item]: !prev[item] }));
  };
  const menuItems: MenuItems = {
    common: [
      {
        title: "Mi socio",
        icon: <SportsTennisOutlinedIcon />,
        subItems: [
          {
            path: "/formClientes",
            title: "Registrar Clientes",
            icon: <AccessibilityIcon />,
          },
          {
            path: "/formSocios",
            title: "Registrar Socios",
            icon: <PersonAddOutlinedIcon />,
          },
          {
            path: "/formSocioDependiente",
            title: "Registrar Dependientes",
            icon: <AttachMoneyIcon />,
          },
          {
            path: "/formUsuarios",
            title: "Registrar Usuarios",
            icon: <KeyOutlinedIcon />,
          },
          {
            path: "/panelSocios",
            title: "Panel de Socios",
            icon: <FormatListBulletedOutlinedIcon />,
          },
          {
            path: "/cuotasPendientes",
            title: "Cuotas Pendientes",
            icon: <MoneyOffIcon />,
          },
          {
            path: "/cuotasPagadas",
            title: "Cuotas Pagadas",
            icon: <AttachMoneyIcon />,
          },
        ],
      },
    ],
    admin: [
      {
        title: "Profesores",
        icon: <SchoolOutlinedIcon />,
        subItems: [
          {
            path: "/formProfesor",
            title: "Registrar Profesor",
            icon: <GroupAddOutlinedIcon />,
          },
          {
            path: "/panelProfesor",
            title: "Panel de Profesores",
            icon: <FormatListBulletedOutlinedIcon />,
          },
        ],
      },
      {
        title: "Reservas",
        icon: <CheckBoxOutlinedIcon />,
        subItems: [
          {
            path: "/crearReserva",
            title: "Crear Reservas",
            icon: <FormatListBulletedOutlinedIcon />,
          },
          {
            path: "/panelReservas",
            title: "Panel de reservas",
            icon: <FormatListBulletedOutlinedIcon />,
          },
        ],
      },
      {
        title: "Facturacion",
        icon: <DescriptionOutlinedIcon />,
        subItems: [
          {
            path: "/cargarTalonario",
            title: "Cargar Talonario",
            icon: <InsertDriveFileOutlinedIcon />,
          },
        ],
      },
      {
        title: "Eventos",
        icon: <EmojiEventsOutlinedIcon />,
        subItems: [
          {
            path: "/formEventos",
            title: "Cargar Eventos",
            icon: <InsertInvitationOutlinedIcon />,
          },
          {
            path: "/panelEventos",
            title: "Panel de Eventos",
            icon: <EmojiEventsOutlinedIcon />,
          },
          // {
          //   path: "/panelReservas",
          //   title: "Panel de reservas",
          //   icon: <FormatListBulletedOutlinedIcon />,
          // },
        ],
      },
      {
        title: "Clases",
        icon: <ClassOutlinedIcon />,
        subItems: [
          {
            path: "/formClases",
            title: "Crear Clase",
            icon: <AddOutlinedIcon />,
          },
          {
            path: "/panelClases",
            title: "Panel de Clases",
            icon: <FormatListNumberedOutlinedIcon />,
          },
        ],
      },

      {
        title: "Ingresos",
        icon: <MonetizationOnOutlinedIcon />,
        subItems: [
          {
            path: "/ingresos",
            title: "Formulario de Ingresos",
            icon: <CurrencyExchangeOutlinedIcon />,
          },
          {
            path: "/panelIngresos",
            title: "Panel de Ingresos",
            icon: <FormatListBulletedOutlinedIcon />,
          },
        ],
      },
      {
        title: "Egresos",
        icon: <MoneyOffCsredIcon />,
        subItems: [
          {
            path: "/egresos",
            title: "Formulario de Egresos",
            icon: <FormatListBulletedOutlinedIcon />,
          },
          {
            path: "/panelEgresos",
            title: "Panel de Egresos",
            icon: <PriceCheckOutlinedIcon />,
          },
        ],
      },
      {
        title: "Caja",
        icon: <LocalAtmOutlinedIcon />,
        subItems: [
          {
            path: "/abrirCaja",
            title: "Abrir Caja",
            icon: <LockOpenOutlinedIcon />,
          },
          {
            path: "/cerrarCaja",
            title: "Cerrar Caja",
            icon: <LockOutlinedIcon />,
          },
          {
            path: "/resumenXFecha",
            title: "Resumen por Fecha ",
            icon: <FeedOutlinedIcon />,
          },
        ],
      },
      {
        title: "Compras Club",
        icon: <ShoppingCartCheckoutOutlinedIcon />,
        subItems: [
          {
            path: "/formCompras",
            title: "Cargar Compras",
            icon: <AddCardOutlinedIcon />,
          },
          {
            path: "/dashboardProfesores",
            title: "Profesores",
            icon: <SchoolOutlinedIcon />,
          },
        ],
      },
      {
        title: "Dashboards",
        icon: <EqualizerOutlinedIcon />,
        subItems: [
          {
            path: "/dashboardSociosClientes",
            title: "Socios Y Clientes",
            icon: <PersonOutlineOutlinedIcon />,
          },
          {
            path: "/dashboardProfesores",
            title: "Profesores",
            icon: <SchoolOutlinedIcon />,
          },
        ],
      },
    ],
  };

  const filteredItems = [
    ...menuItems.common,
    ...(loginResponse?.acceso.tipoUsuario === role.Admin
      ? menuItems.admin
      : []),
  ];

  return (
    <React.Fragment>
      {filteredItems.map((menuItem, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleClick(menuItem.title)}>
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.title} />
          </ListItemButton>
          <Collapse in={open[menuItem.title]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItem.subItems.map((subItem, subIndex) => (
                <ListItemButton
                  key={subIndex}
                  sx={{ pl: 3 }}
                  onClick={() => navigate(subItem.path)}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText secondary={subItem.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default MainListItems;
