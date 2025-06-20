import { useState } from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import {
  MenuOutlinedIcon,
  SchoolOutlinedIcon,
  PersonOutlinedIcon,
  StickyNote2OutlinedIcon,
} from "../icons";
export const SidebarProyect = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#30302e",
        },
        [`.${menuClasses.menuItemRoot}`]: {
          marginTop: 10,
        },
      }}
      collapsed={!isExpanded}
      style={{ height: "100vh" }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0)
              return {
                color: disabled ? "#f5d9ff" : "#33BEFF",
                backgroundColor: active ? "yellow" : undefined,
              };
            else if (level === 1)
              return {
                color: disabled ? "#f5d9ff" : "#33BEFF",
                backgroundColor: active ? "yellow" : undefined,
              };
          },
        }}
      >
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          style={{ textAlign: "center" }}
        >
          {" Menu"}
        </MenuItem>
        <SubMenu
          label="Profesores"
          icon={<SchoolOutlinedIcon />}
          style={{ marginTop: "30px" }}
        >
          <MenuItem
            onClick={() => {
              navigate("/formProfesor");
            }}
          >
            {" "}
            Registrar Profesores
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/panelProfesor");
            }}
          >
            {" "}
            Panel Profesores{" "}
          </MenuItem>
        </SubMenu>
        <SubMenu label="Socios" icon={<PersonOutlinedIcon />}>
          <MenuItem
            onClick={() => {
              navigate("/formSocios");
            }}
          >
            Registrar Socios
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/panelSocios");
            }}
          >
            Panel Socios
          </MenuItem>
          <MenuItem> Horarios Reservados </MenuItem>
        </SubMenu>
        <SubMenu label="Tramites" icon={<StickyNote2OutlinedIcon />}>
          <MenuItem> Pagar Cuotas</MenuItem>
          <MenuItem> Facturas</MenuItem>
          <MenuItem> Estado Cuenta Club</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarProyect;
