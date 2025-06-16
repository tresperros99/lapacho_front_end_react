import { Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { postAgendarClase, putEditarClase } from "../../api/ApiClases";
import BuscadorProfesores from "../../components/genericos/BuscadorProfesores";
import BuscadorSocios from "../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import SelectMesasDelClub from "../../components/genericos/SelectMesasDelClub";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import AgendarClaseDto from "../../models/dtos/clases/AgendarClaseDto.model";
import { MesasDisponible } from "../../models/responses/clases/MesasDisponibles.response";
import { ProfesoresFormateado } from "../../models/responses/profesores/NominaProfesores.response";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";
import { ClasesDelDia } from "../../models/responses/clases/ClasesPorFecha.response";
import { useLocation } from "react-router-dom";
import EditarClaseDto from "../../models/dtos/clases/EditarCpaseDto.model";
import { formatearFechaTipoDate } from "../../helpers/fechas";

const validationSchema = yup.object({
  inicio: yup.string().required("La hora de inicio es requerida"),
  fin: yup.string().required("La hora de fin es requerida"),
});

const getInitialValues = (clase?: ClasesDelDia) => {
  const now = new Date();
  return {
    inicio: clase?.horaDesde ?? now,
    fin: clase?.horaHasta ?? now,
  };
};

const FormClases = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const claseCargada = location.state as ClasesDelDia;
  const isEdicion = !!claseCargada;
  const [loadingAgendarClase, setLoadingAgendarClase] = useState(false);
  const [profesor, setProfesor] = useState<ProfesoresFormateado | null>(null);
  const [mesaSeleccionada, setMesaSeleccionada] =
    useState<MesasDisponible | null>(null);

  const [socio, setSocio] = useState<Socio | null>(null);

  const handleSelectProfesores = useCallback(
    (profesor: ProfesoresFormateado | null) => {
      setProfesor(profesor);
    },
    [],
  );
  const handleSelectSocio = useCallback((socio: Socio | null) => {
    setSocio(socio);
  }, []);
  const formik = useFormik({
    initialValues: getInitialValues(claseCargada),
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!socio || !profesor || !mesaSeleccionada) {
          console.error("Faltan datos");
          return;
        }
        setLoadingAgendarClase(true);

        const nuevoAgendamiento: AgendarClaseDto = {
          idProfesor: profesor.idProfesor,
          inicio: values.inicio,
          fin: values.fin,
          idCliente: socio.idCliente,
          idMesa: mesaSeleccionada.idMesa,
        };

        if (isEdicion) {
          const editarAgendamientoClase: EditarClaseDto = {
            fechaAgendamiento: formatearFechaTipoDate(
              claseCargada.fechaCreacion,
            ),
            inicio: nuevoAgendamiento.inicio,
            fin: nuevoAgendamiento.fin,
            idAgendamiento: claseCargada.idAgendamiento,
            idMesa: nuevoAgendamiento.idMesa,
            idProfesor: nuevoAgendamiento.idProfesor,
          };
          const editarAgentamientoResp = await putEditarClase(
            editarAgendamientoClase,
          );

          if (editarAgentamientoResp) {
            dispatch(
              setSuccess(
                editarAgentamientoResp.msg ?? "Classe editada con éxito",
              ),
            );
          }
        }else{
          const nuevaClaseResp = await postAgendarClase(nuevoAgendamiento);

          if (nuevaClaseResp) {
            dispatch(
              setSuccess(nuevaClaseResp.msg ?? "Classe agendada con éxito"),
            );
            resetForm();
          }
        }


      } finally {
        setLoadingAgendarClase(false);
      }
    },
  });
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          {isEdicion ? "Edición de clase" : "Agendamiento de Clase"}
        </Typography>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={6}>
            <BuscadorProfesores
              onSelect={handleSelectProfesores}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="datetime-local"
              id="inicio"
              name="inicio"
              label="Hora de Inicio"
              value={formik.values.inicio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.inicio && Boolean(formik.errors.inicio)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="datetime-local"
              id="fin"
              name="fin"
              label="Hora de Fin"
              value={formik.values.fin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fin && Boolean(formik.errors.fin)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectMesasDelClub
              fullWidth
              setMesaSeleccionada={setMesaSeleccionada}
            />
          </Grid>
          <Grid item xs={6}>
            <BuscadorSocios onSelect={handleSelectSocio} margin="dense" />
          </Grid>

          <Grid item xs={12} mt={2}>
            <CustomButton
              text={isEdicion ? "Guardas" : "Crear"}
              type="submit"
              loading={loadingAgendarClase}
            />
          </Grid>
        </Grid>
      </form>
    </ContainerComponent>
  );
};

export default FormClases;
