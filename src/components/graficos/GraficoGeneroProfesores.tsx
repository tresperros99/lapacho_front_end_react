import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { delay } from "../../helpers/shared";

interface DataGenero {
  genero: "Masculino" | "Femenino";
  cantidad: number;
}

const dataGénero: DataGenero[] = [
  { genero: "Masculino", cantidad: 30 },
  { genero: "Femenino", cantidad: 20 },
];

const GraficoGeneroProfesores = () => {
  const [loading, setLoading] = useState(false);
  const [generoProfesores, setGeneroProfesores] = useState<DataGenero[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setGeneroProfesores(dataGénero);
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
        Proporción de Profesores por Género
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
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
              {generoProfesores.map((_, index) => (
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

export default GraficoGeneroProfesores;
