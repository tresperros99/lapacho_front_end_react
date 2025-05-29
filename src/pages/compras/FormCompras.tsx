import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import { CustomButton } from "../../components/genericos/Shared/CustomButton";

interface Compra {
  descripcion: string;
  cantidad: number;
  gastoFijo: boolean;
  tipoEgreso: number;
  fechaVencimiento: string | null;
}

const FormularioComprasArray = () => {
  const [compras, setCompras] = useState<Compra[]>([]);

  const [nuevaCompra, setNuevaCompra] = useState<Compra>({
    descripcion: "",
    cantidad: 1,
    gastoFijo: false,
    tipoEgreso: 7,
    fechaVencimiento: null,
  });

  const handleNuevaCompraChange = (
    field: keyof Compra,
    value: string | number | boolean | null
  ) => {
    setNuevaCompra((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCompra = () => {
    if (nuevaCompra.descripcion.trim() === "" || nuevaCompra.cantidad <= 0) return;

    setCompras([...compras, nuevaCompra]);
    setNuevaCompra({
      descripcion: "",
      cantidad: 1,
      gastoFijo: false,
      tipoEgreso: 7,
      fechaVencimiento: null,
    });
  };

  const handleRemoveCompra = (index: number) => {
    const updatedCompras = compras.filter((_, i) => i !== index);
    setCompras(updatedCompras);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { compras };
    console.log("Compras enviadas:", JSON.stringify(body, null, 2));
  };

  return (
    <ContainerComponent>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Compras
        </Typography>

        {/* Inputs para una nueva compra */}
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={3}>
          <TextField
            label="Descripción"
            variant="outlined"
            size="small"
            fullWidth
            value={nuevaCompra.descripcion}
            onChange={(e) =>
              handleNuevaCompraChange("descripcion", e.target.value)
            }
          />
          <TextField
            label="Cantidad"
            variant="outlined"
            size="small"
            type="number"
            value={nuevaCompra.cantidad}
            onChange={(e) =>
              handleNuevaCompraChange("cantidad", Number(e.target.value))
            }
            sx={{ width: 120 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={nuevaCompra.gastoFijo}
                onChange={(e) =>
                  handleNuevaCompraChange("gastoFijo", e.target.checked)
                }
              />
            }
            label="Gasto Fijo"
          />
          <CustomButton
            text="Agregar Compra"
            type="button"
            onClick={handleAddCompra}
          />
        </Box>

        {/* Tabla de compras agregadas */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Descripción</strong>
                </TableCell>
                <TableCell>
                  <strong>Cantidad</strong>
                </TableCell>
                <TableCell>
                  <strong>Gasto Fijo</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compras.map((compra, index) => (
                <TableRow key={index}>
                  <TableCell>{compra.descripcion}</TableCell>
                  <TableCell>{compra.cantidad}</TableCell>
                  <TableCell>{compra.gastoFijo ? "Sí" : "No"}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleRemoveCompra(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {compras.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay compras agregadas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Botón de guardar */}
        <Box display="flex" justifyContent="center" mt={3}>
          <CustomButton text="Guardar Compras" type="submit" />
        </Box>
      </form>
    </ContainerComponent>
  );
};

export default FormularioComprasArray;
