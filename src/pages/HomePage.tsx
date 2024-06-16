import { DateSelectArg, EventInput } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { getEventosDelMes } from '../api/ApiEventos';
import { getReservasDelClub } from '../api/ApiReservas';
import EventFormModal from '../components/calendarEvents/EventFormModal';
import { ContainerComponent } from '../components/genericos/ContainerComponent';
import { formatearFechaTipoDate } from '../helpers/fechas';


export const HomePage: React.FC = () => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const calendarRef = useRef<FullCalendar>(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
    const [currentDates, setCurrentDates] = useState<{ start: Date; end: Date } | null>(null);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        setSelectedInfo(selectInfo);
        setModalIsOpen(true);
    };


    const handleModalClose = () => {
        setModalIsOpen(false);
        setSelectedInfo(null);
    };
    const handleDatesRender = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            const view = calendarApi.view;
            const start = view.activeStart;
            const end = view.activeEnd;
            setCurrentDates({ start: start, end: end });

        }
    };

    const handleFormSubmit = (values: any) => {
        if (selectedInfo) {
            const newEvent: EventInput = {
                title: values.title,
                start: `${selectedInfo.startStr.split('T')[0]}T${values.start}`,
                end: `${selectedInfo.startStr.split('T')[0]}T${values.end}`,
                allDay: selectedInfo.allDay,
                extendedProps: {
                    description: values.description
                }
            };
            setEvents(prevEvents => [...prevEvents, newEvent]);
            console.log('Eventos:', [...events, newEvent]);
        }
    };


    const fetchEventos = async (start: Date, end: Date) => {
        const reservas = await getReservasDelClub(formatearFechaTipoDate(start), formatearFechaTipoDate(end), 1);
        const mes = start.getMonth() + 1;
        const eventos = await getEventosDelMes(mes);
        //TODO: esto trae todo los eventos del mesel busdc
        if (reservas) {
            const events: EventInput[] = reservas.reservasClub.map(eventos => ({
                title: eventos.nombreCmp,
                start: eventos.horaDesde,
                end: eventos.horaHasta,
                allDay: false,
                extendedProps: {
                    description: eventos.nombreCmp
                }
            }));

            setEvents(events);
        }
    };
    useEffect(() => {


        if (currentDates && currentDates.start && currentDates.end) {
            fetchEventos(currentDates.start, currentDates.end);
        }
    }, [currentDates]);

    return (
        <ContainerComponent>
            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Calendario de Actividades</Typography>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                ref={calendarRef}
                locale={esLocale}
                selectable={true}
                select={handleDateSelect}
                datesSet={handleDatesRender}
            />
            <EventFormModal
                isOpen={modalIsOpen}
                onRequestClose={handleModalClose}
                onSubmit={handleFormSubmit}
                initialValues={{
                    title: '',
                    description: '',
                    start: '',
                    end: ''
                }}
            />
        </ContainerComponent>
    );
};

export default HomePage;
