import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import { getCantidadSociosAlDia } from "../../api/ApiGraficos";
import { Estado } from "../../models/responses/graficos/ObtenerSociosAlDia.response";

const GraficoCantidadSocioAlDia = () => {
  const [loading, setLoading] = useState(false);
  const [costosClases, setCostosClases] = useState<Estado[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await getCantidadSociosAlDia();
      if (resp) setCostosClases(resp.estados);
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
        Cantidad De socios al Dia vs Morosos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={costosClases}
              dataKey="cantidad"
              nameKey="estado"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {costosClases.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#0088FE" : "#FF8042"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoCantidadSocioAlDia;
