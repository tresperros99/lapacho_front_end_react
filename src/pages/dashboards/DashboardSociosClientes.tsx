import { Grid, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";

const dataMorosidad = [
  { estado: "Al día", cantidad: 120 },
  { estado: "Morosos", cantidad: 45 },
];

const dataCategorias = [
  { categoria: "Juvenil", cantidad: 50 },
  { categoria: "Adulto", cantidad: 80 },
  { categoria: "Vitalicio", cantidad: 35 },
];

const cantidadSociosClientes = [
  { tipo: "Clientes", cantidad: 250 },
  { tipo: "Socios", cantidad: 140 },
];

const dataEvolucion = [
  { mes: "Ene", socios: 140 },
  { mes: "Feb", socios: 145 },
  { mes: "Mar", socios: 150 },
  { mes: "Abr", socios: 155 },
  { mes: "May", socios: 160 },
  { mes: "Jun", socios: 165 },
];

const dataEdades = [
  { categoria: "Juvenil", edadPromedio: 18 },
  { categoria: "Adulto", edadPromedio: 35 },
  { categoria: "Vitalicio", edadPromedio: 65 },
];

const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

const DashboardSociosClientes = () => {
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Socios y Clientes
      </Typography>
      <Grid container spacing={3}>
        {/* Fila 1: Gráfico de barras y gráfico de torta */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Socios al día vs. Morosos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataMorosidad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Distribución de Socios por Categoría
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataCategorias}
                  dataKey="cantidad"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dataCategorias.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fila 2: Gráfico de líneas y gráfico de radar */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Evolución de Socios en los Últimos Meses
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataEvolucion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="socios" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Edad Promedio de los Socios por Categoría
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataEdades}>
                <PolarGrid />
                <PolarAngleAxis dataKey="categoria" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar
                  name="Edad Promedio"
                  dataKey="edadPromedio"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Socios Activos vs. Inactivos (Proporción)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataEvolucion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="socios" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Clientes vs Socios
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cantidadSociosClientes}
                  dataKey="cantidad"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dataCategorias.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default DashboardSociosClientes;
