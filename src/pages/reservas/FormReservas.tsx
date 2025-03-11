import { Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { postAgendarReservaDelClub } from "../../api/ApiReservas";
import BuscadorSocios from "../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import SelectMesasDelClub from "../../components/genericos/SelectMesasDelClub";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";
import AgendarReservaClubDto from "../../models/dtos/reservas/AgendarReserva.dto.model";
import { MesasDisponible } from "../../models/responses/clases/MesasDisponibles.response";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

const validationSchema = yup.object({
  horaDesde: yup.string().required("La fecha desde es requerida"),
  horaHasta: yup.string().required("La fecha hasta es requerida "),
  idMesa: yup.string().required("Debe seleccionar una mesa"),
  idCliente: yup.string().required("Debe ser seleccioando"),
});
const FormReservas = () => {
  const [mesaSeleccionada, setMesaSeleccionada] =
    useState<MesasDisponible | null>(null);
  const [selectedSocio, setSelectedSocio] = useState<Socio | null>(null);
  const [loadingAgendarReserva, setLoadingAgendarReserva] = useState(false);
  const now = new Date();
  const handleSelectSocio = (socio: Socio | null) => {
    setSelectedSocio(socio);
  };
  const formik = useFormik({
    initialValues: {
      horaDesde: now,
      horaHasta: now,
      idMesa: 0,
      idCliente: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (nuevaReserva: AgendarReservaClubDto, { resetForm }) => {
      setLoadingAgendarReserva(true);
      try {
        const agendarReserva = await postAgendarReservaDelClub({
          ...nuevaReserva,
          idMesa: mesaSeleccionada
            ? mesaSeleccionada.idMesa
            : nuevaReserva.idMesa,
          idCliente: selectedSocio
            ? selectedSocio.idCliente
            : nuevaReserva.idCliente,
        });

        if (agendarReserva?.status) {
          resetForm();
        }
      } finally {
        setLoadingAgendarReserva(false);
      }
    },
  });
  return (
    <ContainerComponent>
      <form onSubmit={formik.handleSubmit}>
        <Typography textAlign={"center"} variant="h4" marginBottom={2}>
          Creacion de Reservas
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SelectMesasDelClub
              fullWidth
              setMesaSeleccionada={setMesaSeleccionada}
            />
          </Grid>
          <Grid item xs={6}>
            <BuscadorSocios onSelect={handleSelectSocio} />
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
          <Grid xs={12} style={{ marginTop: 10 }}>
            <CustomButton
              text="Crear"
              type="submit"
              loading={loadingAgendarReserva}
            />
          </Grid>
        </Grid>
      </form>
    </ContainerComponent>
  );
};

export default FormReservas;
