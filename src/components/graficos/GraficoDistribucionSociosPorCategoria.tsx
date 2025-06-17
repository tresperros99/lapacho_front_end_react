import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { delay } from "../../helpers/shared";

interface DataCategoria {
  categoria: string;
  cantidad: number;
}

const dataCategorias: DataCategoria[] = [
  { categoria: "Juvenil", cantidad: 50 },
  { categoria: "Adulto", cantidad: 80 },
  { categoria: "Vitalicio", cantidad: 35 },
];
const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

const GraficoDistribucionSociosPorCategoria = () => {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<DataCategoria[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setCategorias(dataCategorias);
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
        Distribución de Socios por Categoría
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
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
              {categorias.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
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

export default GraficoDistribucionSociosPorCategoria;
