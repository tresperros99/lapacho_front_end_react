import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { postCrearEventoClub } from "../../api/ApiEventos";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import SelectTipoEvento from "../../components/genericos/SelectTipoEvento";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import { setSuccess } from "../../features/ui/ui.slice";
import {
  Categoria,
  NuevoEventoDto,
  Requerimiento,
} from "../../models/dtos/eventos/NuevoEventoDto.model";
import { TiposEvento } from "../../models/responses/eventos/TipoEvento.response";
import { NumericFormat } from "react-number-format";
import RequerimientosForm from "./subComponentes/RequerimientosForm";
import CategoriasForm from "./subComponentes/CategoriasForm";

const validationSchema = yup.object({
  nombreEvento: yup.string().required("El nombre del evento es requerido"),
  descripcion: yup.string().required("La descripcion es requerida"),
  tipoEvento: yup.string().required("El tipo de evento es requerido"),
  todoElDia: yup.string().required(""),
  costoEvento: yup
    .number()
    .required("El costo del evento es requerido")
    .positive("El costo debe ser positivo"),
  horaDesde: yup.string().required("La fecha desde es requerida"),
  horaHasta: yup.string().required("La fecha hasta es requerida "),
});

const FormEventos = () => {
  const dispatch = useDispatch();
  const [loadingCrearEvento, setLoadingCrearEvento] = useState(false);
  const [tipoEvento, setTipoEvento] = useState<TiposEvento | null>(null);
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const habdleTodoElDia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    formik.setFieldValue("todoElDia", checked ? "S" : "N");
  };

  const formik = useFormik<NuevoEventoDto>({
    initialValues: {
      nombreEvento: "",
      descripcion: "",
      tipoEvento: 5,
      todoElDia: "N",
      costoEvento: 0,
      horaDesde: new Date(),
      horaHasta: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevoEvento: NuevoEventoDto, { resetForm }) => {
      try {
        setLoadingCrearEvento(true);
        if (tipoEvento) {
          nuevoEvento.tipoEvento = tipoEvento.idTipoEvento;
        }
        if (tipoEvento?.idTipoEvento === 5) {
          nuevoEvento.requerimientos = requerimientos;
          nuevoEvento.categorias = categorias;
        }
        console.log(nuevoEvento);
        
        const nuevoEventoResp = await postCrearEventoClub(nuevoEvento);

        if (nuevoEventoResp) {
          dispatch(setSuccess(nuevoEventoResp.msg ?? "Evento Creado"));
          resetForm();
        }
      } finally {
        setLoadingCrearEvento(false);
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
          Creacion de Eventos
        </Typography>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="nombreEvento"
              name="nombreEvento"
              label="Nombre del Evento"
              value={formik.values.nombreEvento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nombreEvento &&
                Boolean(formik.errors.nombreEvento)
              }
              helperText={
                formik.touched.nombreEvento && formik.errors.nombreEvento
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="descripcion"
              name="descripcion"
              label="Descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.descripcion && Boolean(formik.errors.descripcion)
              }
              helperText={
                formik.touched.descripcion && formik.errors.descripcion
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SelectTipoEvento fullWidth setTipoEvento={setTipoEvento} />
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              fullWidth
              customInput={TextField}
              margin="dense"
              label="Costo del Evento"
              thousandSeparator="."
              decimalSeparator=","
              suffix=" GS"
              onValueChange={(values) => {
                formik.setFieldValue("costoEvento", values.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="datetime-local"
              id="horaDesde"
              name="horaDesde"
              label="Hora Desde"
              value={formik.values.horaDesde}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.horaDesde && Boolean(formik.errors.horaDesde)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="datetime-local"
              id="horaHasta"
              name="horaHasta"
              label="Hora Hasta"
              value={formik.values.horaHasta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.horaHasta && Boolean(formik.errors.horaHasta)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.todoElDia === "S"}
                    onChange={habdleTodoElDia}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Todo el dia"
              />
            </FormControl>
          </Grid>
          <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />
          {tipoEvento?.idTipoEvento === 5 && (
            <>
              <RequerimientosForm
                requerimientos={requerimientos}
                setRequerimientos={setRequerimientos}
              />
              <CategoriasForm
                categorias={categorias}
                setCategorias={setCategorias}
              />
            </>
          )}

          <Grid item xs={12} mt={2}>
            <CustomButton
              text="Crear"
              type="submit"
              loading={loadingCrearEvento}
            />
          </Grid>
        </Grid>
      </form>
    </ContainerComponent>
  );
};

export default FormEventos;
