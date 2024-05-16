import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo para el estado de apertura de los submenús
type OpenState = {
    [key: string]: boolean;
};

export const MainListItems = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<OpenState>({});

    // Función para manejar clics en los ítems del menú principal
    const handleClick = (item: string) => {
        setOpen(prev => ({ ...prev, [item]: !prev[item] }));
    };

    return (
        <React.Fragment>

            {/* Menú y submenú para "Mi socio" con nuevas categorías */}
            <ListItemButton onClick={() => handleClick('MiSocio')}>
                <ListItemIcon>
                    <SportsTennisOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Mi socio" />
            </ListItemButton>
            <Collapse in={open['MiSocio']} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/cuotasPendientes') }}>
                        <ListItemText primary="Cuotas Pendientes Socio" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/cuotasPagadas') }}>
                        <ListItemText primary="Cuotas Pagadas Socio" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/pagoDeCuotas') }}>
                        <ListItemText primary="Pago de Cuotas" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Menú y submenú para "Profesores" */}
            <ListItemButton onClick={() => handleClick('Profesores')}>
                <ListItemIcon>
                    <SchoolOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profesores" />
            </ListItemButton>
            <Collapse in={open['Profesores']} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/formProfesor') }}>
                        <ListItemText primary="Registrar Profesor" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/panelProfesor') }}>
                        <ListItemText primary="Panel de Profesores" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Menú y submenú para "Socios" */}
            <ListItemButton onClick={() => handleClick('Socios')}>
                <ListItemIcon>
                    <PersonOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Socios" />
            </ListItemButton>
            <Collapse in={open['Socios']} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/formSocios') }}>
                        <ListItemText primary="Registrar Socios" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/panelSocios') }}>
                        <ListItemText primary="Panel de Socios" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Menú y submenú para "Ingresos" */}
            <ListItemButton onClick={() => handleClick('Ingresos')}>
                <ListItemIcon>
                    <MonetizationOnOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Ingresos" />
            </ListItemButton>
            <Collapse in={open['Ingresos']} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/ingresos') }}>
                        <ListItemText primary="Formulario de Ingresos" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/panelIngresos') }}>
                        <ListItemText primary="Panel de Ingresos" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Menú y submenú para "Egresos" */}
            <ListItemButton onClick={() => handleClick('Egresos')}>
                <ListItemIcon>
                    <MoneyOffCsredIcon />
                </ListItemIcon>
                <ListItemText primary="Egresos" />
            </ListItemButton>
            <Collapse in={open['Egresos']} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/egresos') }}>
                        <ListItemText primary="Formulario de Egresos" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/panelEgresos') }}>
                        <ListItemText primary="Panel de Egresos" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Menú para "Horarios Reservados" */}
            <ListItemButton onClick={() => { navigate('/horarios') }}>
                <ListItemIcon>
                    <StickyNote2OutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Horarios Reservados" />
            </ListItemButton>
        </React.Fragment>
    );
}

export default MainListItems;
