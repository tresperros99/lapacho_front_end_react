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
} from "@mui/material";
import { Requerimiento } from "../../../models/dtos/eventos/NuevoEventoDto.model";
import { NumericFormat } from "react-number-format";
import { separadorMiles } from "../../../helpers/Numbers";

interface RequerimientosFormProps {
  requerimientos: Requerimiento[];
  setRequerimientos: React.Dispatch<React.SetStateAction<Requerimiento[]>>;
}

const RequerimientosForm: React.FC<RequerimientosFormProps> = ({
  requerimientos,
  setRequerimientos,
}) => {
  const [nuevoRequerimiento, setNuevoRequerimiento] = useState<Requerimiento>({
    descripcion: "",
    cantidad: 0,
    costo: 0,
  });

  const agregarRequerimiento = () => {
    if (nuevoRequerimiento.descripcion.trim()) {
      setRequerimientos([...requerimientos, nuevoRequerimiento]);
      setNuevoRequerimiento({ descripcion: "", cantidad: 0, costo: 0 });
    }
  };

  const eliminarRequerimiento = (index: number) => {
    setRequerimientos(requerimientos.filter((_, i) => i !== index));
  };

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Requerimientos</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Descripción"
          fullWidth
          value={nuevoRequerimiento.descripcion}
          onChange={(e) =>
            setNuevoRequerimiento({
              ...nuevoRequerimiento,
              descripcion: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <NumericFormat
          fullWidth
          customInput={TextField}
          label="Cantidad"
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) =>
            setNuevoRequerimiento({
              ...nuevoRequerimiento,
              cantidad: parseInt(values.value),
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
            setNuevoRequerimiento({
              ...nuevoRequerimiento,
              costo: parseInt(values.value),
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={agregarRequerimiento}>
          Agregar requerimiento
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requerimientos.map((req, index) => (
              <TableRow key={index}>
                <TableCell>{req.descripcion}</TableCell>
                <TableCell>{separadorMiles(req.cantidad, true)}</TableCell>
                <TableCell>{separadorMiles(req.costo, true)} Gs.</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => eliminarRequerimiento(index)}
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

export default RequerimientosForm;
