import {
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import BuscadorSocios from "../../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../../components/genericos/ContainerComponent";
import SelectCategoriaEvento from "../../../components/genericos/SelectCategoriaEventos";
import { CustomButton } from "../../../components/genericos/Shared/CustomButton";
import InscribirseAEventoDto from "../../../models/dtos/eventos/InscribirseAEventoDto.model";
import { CategoriasEvento } from "../../../models/responses/eventos/ObtenerCategoriasEventos.response";
import { EventosMes } from "../../../models/responses/eventos/ObtenerEventosConCategorias.response";
import { Socio } from "../../../models/responses/socios/SociosPorCedula.response";
import { postInscribirseAEvento } from "../../../api/ApiEventos";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../../features/ui/ui.slice";

const validationSchema = yup.object({
  descInscripcion: yup.string().required('La descripción es obligatoria'),
});

const FormInscripciones = () => {
  const location = useLocation();
  const eventoMes = location.state  as EventosMes ?? null;
  const dispatch = useDispatch();

  const [loadingCrearEvento, setLoadingCrearEvento] = useState(false);

  const [categoria, setCategoria] = useState<CategoriasEvento | null>(null);
  const [socio, setSocio] = useState<Socio | null>(null);
  const handleSelectSocio = (socio: Socio | null) => {
    setSocio(socio);
  };
  const formik = useFormik({
    initialValues: {
      descInscripcion: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
    try {
      
      if (!socio || !categoria) {
        console.error("Faltan datos");
        return;
      }

    const nuevaInscripcioPayload: InscribirseAEventoDto = {
      idCliente: socio.idCliente,
      categorias: [
        {
          idCategoria: categoria.idCategoria,
          idEvento: categoria.idEvento,
          descInscripcion: values.descInscripcion,
        },
      ],
    };

    setLoadingCrearEvento(true);

    const nuevaInscripcionResp = await postInscribirseAEvento(nuevaInscripcioPayload);

    if (nuevaInscripcionResp) {
        dispatch(setSuccess(nuevaInscripcionResp.msg));
      
    }

  } finally {
    setLoadingCrearEvento(false);
    resetForm();
  }
    },
  });

  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Incripciones a Eventos
        </Typography>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={6}>
            <BuscadorSocios onSelect={handleSelectSocio} margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <SelectCategoriaEvento fullWidth idEvento={eventoMes.idEventoCalendario} setCategoriaEvento={setCategoria} />
          </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="dense"
                id="descInscripcion"
                name="descInscripcion"
                label="Descripcion de la Inscripcion"
              value={formik.values.descInscripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.descInscripcion && Boolean(formik.errors.descInscripcion)
              }
              InputLabelProps={{
                shrink: true,
              }}
              />
          </Grid>

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

export default FormInscripciones;
