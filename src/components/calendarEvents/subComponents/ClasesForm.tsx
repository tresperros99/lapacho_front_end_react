import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { getMesasDisponibles, postAgendarClase } from "../../../api/ApiClases";
import { formatearFechaTipoDate } from "../../../helpers/fechas";
import AgendarClaseDto from "../../../models/dtos/clases/AgendarClaseDto.model";
import { MesasDisponible } from "../../../models/responses/clases/MesasDisponibles.response";
import { ProfesoresFormateado } from "../../../models/responses/profesores/NominaProfesores.response";
import { ContainerComponent } from "../../genericos/ContainerComponent";

interface ClaseFormProps {
  initialValues: AgendarClaseDto;
  onSubmit: () => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  idProfesor: Yup.number().required("Required"),
  inicio: Yup.string().required("Required"),
  fin: Yup.string().required("Required"),
  idMesa: Yup.number().required("Required"),
});

const ClasesForm: React.FC<ClaseFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const [profesores, setProfesores] = useState<ProfesoresFormateado[]>([]);
  const [mesas, setMesas] = useState<MesasDisponible[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProfesores = async () => {
      const data = [] as ProfesoresFormateado[];
      if (data) {
        setProfesores(data);
      }
    };
    fetchProfesores();

    const fetchMesas = async () => {
      const data = await getMesasDisponibles();
      if (data && data.mesasDisponibles) {
        setMesas(data.mesasDisponibles);
      }
    };
    fetchMesas();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ContainerComponent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const claseToSubmit = {
              ...values,
              fechaAgendamiento: formatearFechaTipoDate(new Date()), // Establecer la fecha actual
            };
            await postAgendarClase(claseToSubmit); // Asegúrate de tener esta función definida
            setSnackbarOpen(true);
            onSubmit(); // Recargar eventos
            onClose(); // Cerrar modal
          } catch (error) {
            console.error("There was an error creating the class!", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6">Formulario de Clase</Typography>

              <FormControl fullWidth>
                <InputLabel id="profesor-label">Profesor</InputLabel>
                <Field
                  name="idProfesor"
                  as={Select}
                  labelId="profesor-label"
                  label="Profesor"
                >
                  {profesores.map((profesor) => (
                    <MenuItem
                      key={profesor.idProfesor}
                      value={profesor.idProfesor}
                    >
                      {profesor.nombreProfesor}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="idProfesor" component="div" />
              </FormControl>

              <Field
                name="inicio"
                as={TextField}
                label="Inicio"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
              <ErrorMessage name="inicio" component="div" />

              <Field
                name="fin"
                as={TextField}
                label="Fin"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
              <ErrorMessage name="fin" component="div" />

              <FormControl fullWidth>
                <InputLabel id="mesa-label">Mesa</InputLabel>
                <Field
                  name="idMesa"
                  as={Select}
                  labelId="mesa-label"
                  label="Mesa"
                >
                  {mesas.map((mesa) => (
                    <MenuItem key={mesa.idMesa} value={mesa.idMesa}>
                      {mesa.descMesa}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="idMesa" component="div" />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Crear
              </Button>
            </Box>

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Clase creada exitosamente!
              </Alert>
            </Snackbar>
          </Form>
        )}
      </Formik>
    </ContainerComponent>
  );
};

export default ClasesForm;
