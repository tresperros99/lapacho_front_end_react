import { Grid, Typography } from "@mui/material";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { GraficoAceptacionProfesores, GraficoAlumnosPromedioPorProfesor, GraficoCostoClase, GraficoEvaluacionProfesores, GraficoGeneroProfesores, GraficoProfesoresActivosEInactivos } from "../../components/graficos";


const DashboardProfesores = () => {
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Profesores
      </Typography>
      <Grid container spacing={3}>
        {/* Fila 1: Evaluación de los Profesores */}
        <Grid item xs={12} sm={6}>
        <GraficoEvaluacionProfesores/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GraficoCostoClase/>
        </Grid>

        {/* Fila 2: Distribución de Profesores por Género */}
        <Grid item xs={12} sm={6}>
            <GraficoGeneroProfesores/>
        </Grid>

        {/* Fila 4: Profesores Activos vs Inactivos */}
        <Grid item xs={12} sm={6}>
          <GraficoProfesoresActivosEInactivos/>
        </Grid>

        {/* Fila 5: Cantidad de Alumnos por Profesor */}
        <Grid item xs={12} sm={6}>
          <GraficoAlumnosPromedioPorProfesor/>
        </Grid>
        
        {/* Fila 7: Aceptación del Profesor por los Alumnos */}
        <Grid item xs={12} sm={6}>
          <GraficoAceptacionProfesores/>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default DashboardProfesores;
