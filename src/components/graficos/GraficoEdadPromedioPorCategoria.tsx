import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import { delay } from "../../helpers/shared";

interface DataEvolucion {
  categoria: string;
  edadPromedio: number;
}


const dataEdades:DataEvolucion[] = [
  { categoria: "Juvenil", edadPromedio: 18 },
  { categoria: "Adulto", edadPromedio: 35 },
  { categoria: "Vitalicio", edadPromedio: 65 },
];


const GraficoEdadPromedioPorCategoria = () => {
  const [loading, setLoading] = useState(false);
  const [edadPromedio, setEdadPromedio] = useState<DataEvolucion[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setEdadPromedio(dataEdades);
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
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={edadPromedio}>
                <PolarGrid />
                <PolarAngleAxis dataKey="categoria" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar
                  name="Edad Promedio"
                  dataKey="edadPromedio"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoEdadPromedioPorCategoria;






<Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Edad Promedio de los Socios por Categoría
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataEdades}>
                <PolarGrid />
                <PolarAngleAxis dataKey="categoria" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar
                  name="Edad Promedio"
                  dataKey="edadPromedio"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>