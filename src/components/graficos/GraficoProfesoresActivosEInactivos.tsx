import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { delay } from "../../helpers/shared";

interface DataActivosInactivos {
  mes: string;
  activos: number;
  inactivos: number;
}

const dataActivosInactivos:DataActivosInactivos[] = [
  { mes: "Enero", activos: 25, inactivos: 5 },
  { mes: "Febrero", activos: 28, inactivos: 3 },
  { mes: "Marzo", activos: 30, inactivos: 2 },
];

const GraficoProfesoresActivosEInactivos = () => {
  const [loading, setLoading] = useState(false);
  const [profesoresActivosInactivos, setProfesoresActivosInactivos] = useState<DataActivosInactivos[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setProfesoresActivosInactivos(dataActivosInactivos);
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
              Profesores Activos vs Inactivos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profesoresActivosInactivos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="activos" stroke="#82ca9d" />
                <Line type="monotone" dataKey="inactivos" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoProfesoresActivosEInactivos;