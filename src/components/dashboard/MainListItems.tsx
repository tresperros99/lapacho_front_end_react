import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type OpenState = {
    [key: string]: boolean;
};

interface MainListItemsProps {
    openNavBar: boolean;
}

export const MainListItems = ({ openNavBar }: MainListItemsProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<OpenState>({});

    console.log(openNavBar);

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
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/cuotasPendientes') }}>
                        <ListItemIcon>
                            <MoneyOffIcon />
                        </ListItemIcon>

                        <ListItemText secondary="Cuotas Pendientes" />

                    </ListItemButton>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/cuotasPagadas') }}>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>

                        <ListItemText secondary="Cuotas Pagadas " />

                    </ListItemButton>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/pagoDeCuotas') }}>
                        <ListItemIcon>
                            <PaidOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText secondary="Pago de Cuotas" />

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
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/formProfesor') }}>
                        <ListItemIcon>
                            <GroupAddOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Registrar Profesor" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/panelProfesor') }}>
                        <ListItemIcon>
                            <FormatListBulletedOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText secondary="Panel de Profesores" />


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
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/formSocios') }}>
                        <ListItemIcon>
                            <PersonAddOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText secondary="Registrar Socios" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/panelSocios') }}>
                        <ListItemIcon>
                            <FormatListBulletedOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Panel de Socios" />
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
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/ingresos') }}>
                        <ListItemIcon>
                            <CurrencyExchangeOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText secondary="Formulario de Ingresos" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/panelIngresos') }}>
                        <ListItemIcon>
                            <FormatListBulletedOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Panel de Ingresos" />
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
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/egresos') }}>
                        <ListItemIcon>
                            <FormatListBulletedOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Formulario de Egresos" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 3 }} onClick={() => { navigate('/panelEgresos') }}>
                        <ListItemIcon>
                            <PriceCheckOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Panel de Egresos" />
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
