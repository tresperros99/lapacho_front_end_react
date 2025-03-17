// MainListItems.tsx
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
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

  // Función para manejar clics en los ítems del menú principal
  const handleClick = (item: string) => {
    setOpen((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  // Determinar qué ítems de menú mostrar según el rol
  const menuItems: MenuItems = {
    common: [
      {
        title: "Mi socio",
        icon: <SportsTennisOutlinedIcon />,
        subItems: [
          {
            path: "/formSocios",
            title: "Registrar Socios",
            icon: <PersonAddOutlinedIcon />,
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
            path: "/cargarEventos",
            title: "Cargar Eventos",
            icon: <InsertInvitationOutlinedIcon />,
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
