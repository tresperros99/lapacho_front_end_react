import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { delay } from "../../helpers/shared";

interface ClientesVsSocios {
  tipo: string;
  cantidad: number;
}

const cantidadSociosClientes: ClientesVsSocios[] = [
  { tipo: "Clientes", cantidad: 250 },
  { tipo: "Socios", cantidad: 140 },
];

const COLORS = ["#0088FE", "#FF8042", "#00C49F"];


const GraficoClienteVsSocios = () => {
  const [loading, setLoading] = useState(false);
  const [clientesVsSocios, setClientesVsSocios] = useState<ClientesVsSocios[]>([]);

  const fetchCostoClases = useCallback(async () => {
    setLoading(true);
    try {
      await delay(1800);
      setClientesVsSocios(cantidadSociosClientes);
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
        Clientes vs Socios
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientesVsSocios}
                  dataKey="cantidad"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {clientesVsSocios.map((_, index) => (
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

export default GraficoClienteVsSocios;


