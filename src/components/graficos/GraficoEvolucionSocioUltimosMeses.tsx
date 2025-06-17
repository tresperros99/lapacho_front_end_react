import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { delay } from "../../helpers/shared";

interface DataEvolucion {
  mes: string;
  socios: number;
}


const dataEvolucion:DataEvolucion[] = [
  { mes: "Ene", socios: 140 },
  { mes: "Feb", socios: 145 },
  { mes: "Mar", socios: 150 },
  { mes: "Abr", socios: 155 },
  { mes: "May", socios: 160 },
  { mes: "Jun", socios: 165 },
];

const GraficoEvolucionSocioUltimosMeses = () => {
  const [loading, setLoading] = useState(false);
  const [evolucionSocios, setEvolucionSocios] = useState<DataEvolucion[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setEvolucionSocios(dataEvolucion);
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
        Evolución de Socios en los Últimos Meses
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolucionSocios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="socios" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoEvolucionSocioUltimosMeses;