import { DateSelectArg, DatesSetArg, EventInput } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useCallback, useEffect, useState } from 'react';
import { getReservasDelClub } from '../api/ApiReservas';
import EventFormModal from '../components/calendarEvents/EventFormModal';
import { ContainerComponent } from '../components/genericos/ContainerComponent';
import { formatearFechaTipoDate } from '../helpers/fechas';

// Define el tipo para los eventos que esperas recibir de la API
interface Reserva {
    title: string;
    start: string;
    end: string;
    allDay?: boolean;
    extendedProps?: {
        description?: string;
    };
}

export const HomePage: React.FC = () => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
    const [currentDates, setCurrentDates] = useState<{ start: Date; end: Date }>({ start: new Date(), end: new Date() });

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        setSelectedInfo(selectInfo);
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        setSelectedInfo(null);
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

    const handleDatesSet = useCallback((info: DatesSetArg) => {
        const startDate = info.start;
        const endDate = info.end;
        setCurrentDates({ start: startDate, end: endDate });
    }, []);

    useEffect(() => {
        const fetchReservas = async () => {
            const reservas = await getReservasDelClub(formatearFechaTipoDate(currentDates.start), formatearFechaTipoDate(currentDates.end), 1);

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

        if (currentDates.start && currentDates.end) {
            fetchReservas();
        }
    }, [currentDates]);

    return (
        <ContainerComponent>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                locale={esLocale}
                selectable={true}
                select={handleDateSelect}
                datesSet={handleDatesSet}
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
