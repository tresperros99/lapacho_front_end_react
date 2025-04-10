import { Grid, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";

// Datos de ejemplo
const dataEvaluacion = [
  { profesor: "Juan", evaluacion: 4.2 },
  { profesor: "José", evaluacion: 3.8 },
  { profesor: "Mayra", evaluacion: 4.5 },
  { profesor: "Echague", evaluacion: 3.9 },
  { profesor: "Pablo", evaluacion: 4.0 },
];

const dataGénero = [
  { género: "Masculino", cantidad: 30 },
  { género: "Femenino", cantidad: 20 },
];

const dataActivosInactivos = [
  { mes: "Enero", activos: 25, inactivos: 5 },
  { mes: "Febrero", activos: 28, inactivos: 3 },
  { mes: "Marzo", activos: 30, inactivos: 2 },
];

const dataAlumnosPromedio = [
  { profesor: "Juan", alumnos: 30 },
  { profesor: "José", alumnos: 35 },
  { profesor: "Mayra", alumnos: 28 },
  { profesor: "Echague", alumnos: 25 },
  { profesor: "Pablo", alumnos: 40 },
];

const dataCostoClase = [
  { profesor: "Juan", costo: 50000 },
  { profesor: "José", costo: 60000 },
  { profesor: "Mayra", costo: 45000 },
  { profesor: "Echague", costo: 55000 },
  { profesor: "Pablo", costo: 70000 },
];

const dataAceptacion = [
  { profesor: "Juan", muyBueno: 70, bueno: 20, regular: 5, malo: 5 },
  { profesor: "José", muyBueno: 60, bueno: 30, regular: 5, malo: 5 },
  { profesor: "Mayra", muyBueno: 80, bueno: 15, regular: 5, malo: 0 },
  { profesor: "Echague", muyBueno: 50, bueno: 40, regular: 5, malo: 5 },
  { profesor: "Pablo", muyBueno: 65, bueno: 30, regular: 5, malo: 0 },
];

const DashboardProfesores = () => {
  return (
    <ContainerComponent>
      <Typography textAlign={"center"} variant="h4" marginBottom={2}>
        Profesores
      </Typography>
      <Grid container spacing={3}>
        {/* Fila 1: Evaluación de los Profesores */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Evaluación de los Profesores
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataEvaluacion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="evaluacion" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fila 2: Distribución de Profesores por Género */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Proporción de Profesores por Género
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataGénero}
                  dataKey="cantidad"
                  nameKey="género"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dataGénero.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#0088FE" : "#FF8042"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fila 4: Profesores Activos vs Inactivos */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Profesores Activos vs Inactivos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataActivosInactivos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="activos" stroke="#82ca9d" />
                <Line type="monotone" dataKey="inactivos" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fila 5: Cantidad de Alumnos por Profesor */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Alumnos Promedio por Profesor
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataAlumnosPromedio}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="alumnos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fila 6: Costo de Clase por Profesor */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Costo de Clase por Profesor en Guaranies
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataCostoClase}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="costo" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Fila 7: Aceptación del Profesor por los Alumnos */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Aceptación del Profesor por los Alumnos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataAceptacion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="muyBueno" fill="#82ca9d" />
                <Bar dataKey="bueno" fill="#8884d8" />
                <Bar dataKey="regular" fill="#ff7300" />
                <Bar dataKey="malo" fill="#ff0000" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default DashboardProfesores;
