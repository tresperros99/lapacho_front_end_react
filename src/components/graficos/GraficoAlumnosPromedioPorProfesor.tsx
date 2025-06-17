import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { delay } from "../../helpers/shared";

interface DataAlumnosPromedio {
  profesor: string;
  alumnos: number;
}

const dataAlumnosPromedio:DataAlumnosPromedio[] = [
  { profesor: "Juan", alumnos: 30 },
  { profesor: "José", alumnos: 35 },
  { profesor: "Mayra", alumnos: 28 },
  { profesor: "Echague", alumnos: 25 },
  { profesor: "Pablo", alumnos: 40 },
];

const GraficoAlumnosPromedioPorProfesor = () => {
  const [loading, setLoading] = useState(false);
  const [alumnosPromedio, setAlumnosPromedio] = useState<DataAlumnosPromedio[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setAlumnosPromedio(dataAlumnosPromedio);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCostoClases();
  }, [fetchCostoClases]);

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
              Alumnos Promedio por Profesor
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alumnosPromedio}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="alumnos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoAlumnosPromedioPorProfesor; 
 
 
 
