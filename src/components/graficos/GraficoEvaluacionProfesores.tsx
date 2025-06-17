import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { delay } from "../../helpers/shared";

interface DataEvaluacion {
  profesor: string;
  evaluacion: number;
}

const dataEvaluacion:DataEvaluacion[] = [
  { profesor: "Juan", evaluacion: 4.2 },
  { profesor: "José", evaluacion: 3.8 },
  { profesor: "Mayra", evaluacion: 4.5 },
  { profesor: "Echague", evaluacion: 3.9 },
  { profesor: "Pablo", evaluacion: 4.0 },
];


const GraficoEvaluacionProfesores = () => {
  const [loading, setLoading] = useState(false);
  const [evaluacionProfesores, setEvaluacionProfesores] = useState<DataEvaluacion[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setEvaluacionProfesores(dataEvaluacion);
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
       Evaluación de los Profesores
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evaluacionProfesores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="evaluacion" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoEvaluacionProfesores;