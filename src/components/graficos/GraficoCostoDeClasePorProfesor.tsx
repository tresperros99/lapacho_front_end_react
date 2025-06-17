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
  YAxis,
} from "recharts";
import { delay } from "../../helpers/shared";

interface DataCostoClase {
  profesor: string;
  costo: number;
}

const dataCostoClase: DataCostoClase[] = [
  { profesor: "Juan", costo: 50000 },
  { profesor: "José", costo: 60000 },
  { profesor: "Mayra", costo: 45000 },
  { profesor: "Echague", costo: 55000 },
  { profesor: "Pablo", costo: 70000 },
];

const GraficoCostoDeClasePorProfesor = () => {
  const [loading, setLoading] = useState(false);
  const [costoClase, setCostoClase] = useState<DataCostoClase[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setCostoClase(dataCostoClase);
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
        Costo de Clase por Profesor en Guaranies
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costoClase}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="profesor" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="costo" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoCostoDeClasePorProfesor;
