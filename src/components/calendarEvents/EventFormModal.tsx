import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    start: Yup.string().required('La hora de inicio es obligatoria'),
    end: Yup.string().required('La hora de fin es obligatoria')
});

interface EventFormModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (values: any) => void;
    initialValues: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px'
};

const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onRequestClose, onSubmit, initialValues }) => {
    return (
        <Modal open={isOpen} onClose={onRequestClose}>
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontWeight={"bold"} >
                        Agregar Evento
                    </Typography>
                    <IconButton onClick={onRequestClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                        onRequestClose();
                    }}
                >
                    <Form>
                        <Box>
                            <Field name="title">
                                {({ field }: any) => (
                                    <TextField {...field} label="Nombre Evento" fullWidth margin="normal" />
                                )}
                            </Field>
                            <ErrorMessage name="title" component="div">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </Box>
                        <Box>
                            <Field name="description">
                                {({ field }: any) => (
                                    <TextField {...field} label="Descripción" fullWidth margin="normal" />
                                )}
                            </Field>
                            <ErrorMessage name="description">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </Box>
                        <Box>
                            <Field name="start">
                                {({ field }: any) => (
                                    <TextField {...field} label="Hora Inicio" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth margin="normal" />
                                )}
                            </Field>
                            <ErrorMessage name="start" component="div">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </Box>
                        <Box>
                            <Field name="end">
                                {({ field }: any) => (
                                    <TextField {...field} label="Hora Fin" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth margin="normal" />
                                )}
                            </Field>
                            <ErrorMessage name="end" component="div">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{
                            mt: 2
                        }}>
                            Agregar Evento
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </Modal>
    );
};

export default EventFormModal;
