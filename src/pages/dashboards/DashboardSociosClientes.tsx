import { Grid, Typography } from "@mui/material";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { GraficoCantidadSocioAlDia, GraficoDistribucionSociosPorCategoria, GraficoEvolucionSocioUltimosMeses, GraficoEdadPromedioPorCategoria, GraficoClienteVsSocios, GraficoCantidadSociosAtrasadosXMes } from "../../components/graficos";


const DashboardSociosClientes = () => {
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Socios y Clientes
      </Typography>
      <Grid container spacing={3}>
        {/* Fila 1: Gráfico de barras y gráfico de torta */}
        <Grid item xs={12} sm={6}>
          <GraficoCantidadSocioAlDia/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <GraficoDistribucionSociosPorCategoria/>
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <GraficoEvolucionSocioUltimosMeses/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <GraficoEdadPromedioPorCategoria/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <GraficoCantidadSociosAtrasadosXMes/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <GraficoClienteVsSocios/>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default DashboardSociosClientes;
