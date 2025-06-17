import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { delay } from "../../helpers/shared";

interface DataAceptacionProfesores {
  profesor: string;
  muyBueno: number;
  bueno: number;
  regular: number;
  malo: number;
}


const dataAceptacion:DataAceptacionProfesores[] = [
  { profesor: "Juan", muyBueno: 70, bueno: 20, regular: 5, malo: 5 },
  { profesor: "José", muyBueno: 60, bueno: 30, regular: 5, malo: 5 },
  { profesor: "Mayra", muyBueno: 80, bueno: 15, regular: 5, malo: 0 },
  { profesor: "Echague", muyBueno: 50, bueno: 40, regular: 5, malo: 5 },
  { profesor: "Pablo", muyBueno: 65, bueno: 30, regular: 5, malo: 0 },
];

const GraficoAceptacionProfesores = () => {
  const [loading, setLoading] = useState(false);
  const [aceptacionProfesores, setAceptacionProfesores] = useState<DataAceptacionProfesores[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setAceptacionProfesores(dataAceptacion);
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
               Aceptación del Profesor por los Alumnos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aceptacionProfesores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profesor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="muyBueno" fill="#82ca9d" />
                <Bar dataKey="bueno" fill="#8884d8" />
                <Bar dataKey="regular" fill="#ff7300" />
                <Bar dataKey="malo" fill="#ff0000" />
              </BarChart>
            </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GraficoAceptacionProfesores;

