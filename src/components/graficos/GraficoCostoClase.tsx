import { Paper, Typography, CircularProgress } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { getCostoClaseProfesores } from "../../api/ApiGraficos";
import { CostosClase } from "../../models/responses/graficos/ObtenerCostoClaseProfesores.response";

const GraficoCostoClase = () => {
  const [loading, setLoading] = useState(false);
  const [costosClases, setCostosClases] = useState<CostosClase[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await getCostoClaseProfesores();
      if (resp) setCostosClases(resp.costosClase);
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
        Costo de Clase por Profesor
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costosClases}>
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

export default GraficoCostoClase