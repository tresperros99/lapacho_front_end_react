import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material';
import React from 'react';
import AgendarClaseDto from '../../models/dtos/clases/AgendarClaseDto.model';
import CrearEventoDto from '../../models/dtos/eventos/CrearEventoDto.model';
import AgendarReservaClubDto from '../../models/dtos/reservas/AgendarReserva.dto.model';
import ClasesForm from './subComponents/ClasesForm';
import EventForm from './subComponents/EventForm';
import ReservasForm from './subComponents/ReservasForm';

interface EventTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventType: string;
    onEventTypeChange: (event: SelectChangeEvent<string>) => void;
    onEventSubmit: () => void;
    isEditing: boolean;
    initialValues: CrearEventoDto | AgendarClaseDto | AgendarReservaClubDto;
}

const EventTypeModal: React.FC<EventTypeModalProps> = ({
    isOpen,
    onClose,
    eventType,
    onEventTypeChange,
    onEventSubmit,
    initialValues,
}) => {
    const handleEventSubmit = () => {
        onEventSubmit();
        onClose();
    };



    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="event-type-modal-title"
            aria-describedby="event-type-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2" id="event-type-modal-title" mb={2}>
                    Selecciona el tipo de evento
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="event-type-label">Tipo de Evento</InputLabel>
                    <Select
                        labelId="event-type-label"
                        id="event-type-select"
                        value={eventType}
                        label="Tipo de Evento"
                        onChange={onEventTypeChange}
                    >
                        <MenuItem value="EVENTO">Evento</MenuItem>
                        <MenuItem value="CLASE">Clase</MenuItem>
                        <MenuItem value="RESERVA">Reserva</MenuItem>
                    </Select>
                </FormControl>

                {eventType === 'EVENTO' && (
                    <EventForm
                        initialValues={initialValues as CrearEventoDto}
                        onSubmit={handleEventSubmit}
                        onClose={onClose}
                    />
                )}

                {eventType === 'CLASE' && (
                    <ClasesForm
                        initialValues={initialValues as AgendarClaseDto}
                        onSubmit={handleEventSubmit}
                        onClose={onClose}
                    />
                )}

                {eventType === 'RESERVA' && (
                    <ReservasForm
                        initialValues={initialValues as AgendarReservaClubDto}
                        onSubmit={handleEventSubmit}
                        onClose={onClose}
                    />
                )}

                <Box marginTop={2}>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EventTypeModal;
