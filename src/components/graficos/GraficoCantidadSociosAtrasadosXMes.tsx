import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getCantidadSociosAtrasadosXMes } from "../../api/ApiGraficos";
import { SociosAlDiaDetalle } from "../../models/responses/graficos/ObtenerCantidadSociosAtrasadosXMes";

const GraficoCantidadSociosAtrasadosXMes = () => {
  const [loading, setLoading] = useState(false);
  const [sociosAtrasados, setSociosAtrasados] = useState<SociosAlDiaDetalle[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await getCantidadSociosAtrasadosXMes();
      if (resp) setSociosAtrasados(resp.sociosAlDiaDetalle);
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
        Cantidad de Socios Atrasados por mes
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sociosAtrasados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidadAtrasados" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoCantidadSociosAtrasadosXMes;
