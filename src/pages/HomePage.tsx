import { DateSelectArg, EventInput } from "@fullcalendar/core/index.js";
import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { SelectChangeEvent, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getTodosEventosDelCLub } from "../api/ApiEventos";
import EventTypeModal from "../components/calendarEvents/EventTypeModal";
import { ContainerComponent } from "../components/genericos/ContainerComponent";
import { eventColors } from "../helpers/constants";
import TodosEventosClubDto from "../models/dtos/eventos/TodosEventosClubDto.model";

export const HomePage: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const calendarRef = useRef<FullCalendar>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const [currentDates, setCurrentDates] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [eventType, setEventType] = useState<string>(""); // Estado para el tipo de evento seleccionado
  const [isEditing, setIsEditing] = useState(false);
  const [initialEventValues, setInitialEventValues] = useState<any>({}); // Utiliza any para manejar múltiples tipos de valores iniciales

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo);

    // setSelectedInfo(selectInfo);
    setIsEditing(false);
    setInitialEventValues({}); // Restablece los valores iniciales al crear un nuevo evento
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    // setSelectedInfo(null);
    setEventType(""); // Restablecer el tipo de evento al cerrar el modal
  };

  const handleEventTypeChange = (event: SelectChangeEvent<string>) => {
    setEventType(event.target.value as string);
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

  const fetchEventos = async (_start: Date, end: Date) => {
    const fechaDesde = new Date("2024-05-10T04:00:00.000Z");
    const getEventosDelMesDto: TodosEventosClubDto = {
      fechaDesde: fechaDesde,
      fechaHasta: end,
    };
    const eventos = await getTodosEventosDelCLub(getEventosDelMesDto);

    const allEvents: EventInput[] = [];

    if (eventos) {
      eventos.eventosFecha.eventos.forEach((evento) => {
        allEvents.push({
          title: evento.nombreCmp,
          start: evento.horaDesde,
          end: evento.horaHasta,
          allDay: evento.todoEldia,
          backgroundColor: eventColors[evento.descTipoEvento] || "gray",
          extendedProps: {
            description: evento.descripcion,
          },
        });
      });
      eventos.eventosFecha.reservas.forEach((reserva) => {
        allEvents.push({
          title: reserva.nombreCmp,
          start: reserva.horaDesde,
          end: reserva.horaHasta,
          backgroundColor: eventColors["RESERVA"] || "gray",
          extendedProps: {
            description: reserva.descMesa,
          },
        });
      });
      eventos.eventosFecha.clases.forEach((clase) => {
        allEvents.push({
          title: clase.nombreProfesor,
          start: clase.horarioInicio,
          end: clase.horarioHasta,
          backgroundColor: eventColors["CLASE"] || "gray",
          extendedProps: {
            description: clase.descMesa,
          },
        });
      });
    }

    setEvents(allEvents);
  };

  useEffect(() => {
    if (currentDates && currentDates.start && currentDates.end) {
      fetchEventos(currentDates.start, currentDates.end);
    }
  }, [currentDates]);

  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Calendario de Actividades
      </Typography>

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

      <EventTypeModal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        eventType={eventType}
        onEventTypeChange={handleEventTypeChange}
        onEventSubmit={() => {
          if (currentDates) {
            fetchEventos(currentDates.start, currentDates.end);
          }
        }}
        isEditing={isEditing}
        initialValues={initialEventValues}
      />
    </ContainerComponent>
  );
};

export default HomePage;
