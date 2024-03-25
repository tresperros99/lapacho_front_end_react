import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>

            <ListItemButton onClick={() => { navigate('/formProfesor') }}>
                <ListItemIcon>
                    <SchoolOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profesores" />
            </ListItemButton>

            <ListItemButton onClick={() => { navigate('/panelProfesor') }}>
                <ListItemIcon>
                    <SchoolOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Panel de Profesores" />
            </ListItemButton>

            <ListItemButton onClick={() => { navigate('/formSocios') }}>
                <ListItemIcon>
                    <PersonOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Socios" />
            </ListItemButton>

            <ListItemButton onClick={() => { navigate('/panelSocios') }}>
                <ListItemIcon>
                    <PersonOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Panel de Socios" onClick={() => { navigate('/panelSocios') }} />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <StickyNote2OutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Horarios Reservados" />
            </ListItemButton>

        </React.Fragment>
    )
}

export default MainListItems;
