import React, { useState } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Categoria } from "../../../models/dtos/eventos/NuevoEventoDto.model";
import { NumericFormat } from "react-number-format";

interface CategoriasFormProps {
  categorias: Categoria[];
  setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>;
}

const CategoriasForm: React.FC<CategoriasFormProps> = ({
  categorias,
  setCategorias,
}) => {
  const [nuevaCategoria, setNuevaCategoria] = useState<Categoria>({
    nombreCategoria: "",
    descripcion: "",
    costoCategoria: 0,
    edadMaxima: null,
    edadMinima: null,
    nivelMaximo: null,
    nivelMinimo: null,
    sexoPermitido: null,
  });

  const agregarCategoria = () => {
    if (nuevaCategoria.nombreCategoria.trim()) {
      setCategorias([...categorias, nuevaCategoria]);
      setNuevaCategoria({
        nombreCategoria: "",
        descripcion: "",
        costoCategoria: 0,
        edadMaxima: null,
        edadMinima: null,
        nivelMaximo: null,
        nivelMinimo: null,
        sexoPermitido: null,
      });
    }
  };

  const eliminarCategoria = (index: number) => {
    setCategorias(categorias.filter((_, i) => i !== index));
  };

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Categorías</Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Nombre"
          fullWidth
          value={nuevaCategoria.nombreCategoria}
          onChange={(e) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              nombreCategoria: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Descripción"
          fullWidth
          value={nuevaCategoria.descripcion}
          onChange={(e) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              descripcion: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={4}>
        <NumericFormat
          fullWidth
          customInput={TextField}
          label="Costo"
          thousandSeparator="."
          decimalSeparator=","
          suffix=" GS"
          onValueChange={(values) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              costoCategoria: parseInt(values.value),
            })
          }
        />
      </Grid>

      <Grid item xs={3}>
        <NumericFormat
          fullWidth
          customInput={TextField}
          label="Edad Mínima"
          thousandSeparator="."
          decimalSeparator=","
          suffix=" año/s"
          onValueChange={(values) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              edadMinima: parseInt(values.value),
            })
          }
        />
      </Grid>

      <Grid item xs={3}>
        <NumericFormat
          fullWidth
          customInput={TextField}
          label="Edad Máxima"
          thousandSeparator="."
          decimalSeparator=","
          suffix=" año/s"
          onValueChange={(values) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              edadMaxima: parseInt(values.value),
            })
          }
        />
      </Grid>

      <Grid item xs={3}>
      <NumericFormat
          fullWidth
          customInput={TextField}
          label="Nivel Mínimo"
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              nivelMinimo: parseInt(values.value),
            })
          }
        />
      </Grid>

      <Grid item xs={3}>
      <NumericFormat
          fullWidth
          customInput={TextField}
          label="Nivel Máximo"
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              nivelMaximo: parseInt(values.value),
            })
          }
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          select
          label="Sexo Permitido"
          fullWidth
          value={nuevaCategoria.sexoPermitido ?? ""}
          onChange={(e) =>
            setNuevaCategoria({
              ...nuevaCategoria,
              sexoPermitido: e.target.value || null,
            })
          }
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={agregarCategoria}>
          Agregar categoría
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((cat, index) => (
              <TableRow key={index}>
                <TableCell>{cat.nombreCategoria}</TableCell>
                <TableCell>{cat.descripcion}</TableCell>
                <TableCell>{cat.costoCategoria}</TableCell>
                <TableCell>
                  {cat.edadMinima ?? "-"} / {cat.edadMaxima ?? "-"}
                </TableCell>
                <TableCell>
                  {cat.nivelMinimo ?? "-"} / {cat.nivelMaximo ?? "-"}
                </TableCell>
                <TableCell>{cat.sexoPermitido ?? "Todos"}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => eliminarCategoria(index)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default CategoriasForm;
