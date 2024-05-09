import { Copyright } from "@mui/icons-material";
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
}

export const HomePage = () => {
    const localizer = momentLocalizer(moment);

    const myEventsList: CalendarEvent[] = [
        {
            title: 'Cancha registrada',
            start: moment().toDate(), // Hoy
            end: moment().add(1, 'hours').toDate(), // +1 hora
            allDay: false
        },
        {
            title: 'Torneo Integracion',
            start: moment().add(1, 'days').toDate(), // Mañana
            end: moment().add(2, 'days').toDate(), // Pasado mañana
            allDay: true
        },
        {
            title: 'Almuerzo General',
            start: moment().add(2, 'days').toDate(), // Mañana
            end: moment().add(3, 'days').toDate(), // Pasado mañana
            allDay: true
        },
        {
            title: 'Mantenimiento de mesas',
            start: moment().add(4, 'days').toDate(), // Mañana
            end: moment().add(5, 'days').toDate(), // Pasado mañana
            allDay: true
        }
    ];
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography textAlign={'center'} variant='h4' marginBottom={2}>Calendario</Typography>
                <Grid container justifyContent={'center'} alignItems={'center'}>
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"

                        style={{ height: 600, width: '100%' }}
                    />
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    )
}

export default HomePage;
