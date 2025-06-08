import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { postGenerarComprasDelClub } from "../../api/ApiCompras";
import { RootState } from "../../app/store";
import { ContainerComponent } from "../../components/genericos/ContainerComponent";
import SelectTipoEgreso from "../../components/genericos/SelectTipoEgreso";
import { setError, setSuccess } from "../../features/ui/ui.slice";
import { formatearFechaTipoDate } from "../../helpers/fechas";
import { separadorMiles } from "../../helpers/Numbers";
import { Compra } from "../../models/dtos/compras/GenerarComprasClub.model";
import { TiposEgreso } from "../../models/responses/egresos/TipoEgreso.response";

const compraInitalState: Compra = {
  descripcion: "",
  cantidad: 0,
  fechaVencimiento: null,
  gastoFijo: false,
  tipoEgreso: 0,
};

const FormCompras = () => {
  const { tiposEgresos } = useSelector((state: RootState) => state.egresos);
  const dispatch = useDispatch();

  const [compras, setCompras] = useState<Compra[]>([]);
  const [nuevaCompra, setNuevaCompra] = useState<Compra>(compraInitalState);
  const [tipoEgreso, setTipoEgreso] = useState<TiposEgreso | null>(null);
  const agregarRequerimiento = () => {
    if (nuevaCompra.gastoFijo && !nuevaCompra.fechaVencimiento || nuevaCompra.fechaVencimiento && !nuevaCompra.gastoFijo) {
      dispatch(setError("Si es un gasto fijo, debe tener una fecha de vencimiento y viceversa"));
      return;
    }
    if (nuevaCompra.descripcion.trim() && nuevaCompra.cantidad) {
      setCompras([...compras, nuevaCompra]);
      setNuevaCompra(compraInitalState);
      return;
    }
    dispatch(setError("Faltan campos por completar"));
  };
  const eliminarCompra = (index: number) => {
    setCompras(compras.filter((_, i) => i !== index));
  };

  const handleEnviarCompras = async () => {
    if (compras.length === 0) {
      dispatch(setError("No hay compras para enviar"));
      return;
    }
    const generarComprasResp= await postGenerarComprasDelClub({
      compras: compras})
    
    if (generarComprasResp) {
      dispatch(setSuccess(generarComprasResp.msg));
      setCompras([]);
      setNuevaCompra(compraInitalState);
    }
    }


  useEffect(() => {
    if (tipoEgreso) {
      setNuevaCompra({
        ...nuevaCompra,
        tipoEgreso: tipoEgreso.idTipoEgreso,
      });
    }
    
  }, [setTipoEgreso, nuevaCompra, tipoEgreso]);

  return (
    <ContainerComponent>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Compras del Club</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Descripción"
            fullWidth
            value={nuevaCompra.descripcion}
            onChange={(e) =>
              setNuevaCompra({
                ...nuevaCompra,
                descripcion: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <NumericFormat
            fullWidth
            customInput={TextField}
            label="Cantidad"
            thousandSeparator="."
            decimalSeparator=","
            value={nuevaCompra.cantidad}
            onValueChange={(values) =>
              setNuevaCompra({
                ...nuevaCompra,
                cantidad: parseInt(values.value),
              })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <SelectTipoEgreso
            fullWidth
            setTipoEgresoSeleccionado={setTipoEgreso}
          />
        </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={nuevaCompra.gastoFijo}
                            onChange={(e) =>
                              setNuevaCompra({
                                ...nuevaCompra,
                                gastoFijo: e.target.checked,
                              })
                            }
                            name="gastoFijo"
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Gasto Fijo"
                      />
                    </FormControl>
                  </Grid>
        
        <Grid item xs={4}>
          <TextField
            size="small"
            type="date"
            name="fechaVencimiento"
            id="fechaVencimiento"
            label="Fecha De Vencimiento"
            value={nuevaCompra.fechaVencimiento?.toISOString().split("T")[0]}
            onChange={(e) =>
              setNuevaCompra({
                ...nuevaCompra,
                fechaVencimiento: e.target.value
                  ? new Date(e.target.value)
                  : null,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={agregarRequerimiento}>
            Agregar compra
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Gasto Fijo</TableCell>
                <TableCell>Fecha de Vencimiento</TableCell>
                <TableCell>Tipo Egreso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compras.map((compra, index) => (
                <TableRow key={index}>
                  <TableCell>{compra.descripcion}</TableCell>
                  <TableCell>{separadorMiles(compra.cantidad, true)}</TableCell>
                  <TableCell>{compra.gastoFijo ? "SI" : "NO"}</TableCell>
                  <TableCell>
                    {compra.fechaVencimiento ? formatearFechaTipoDate(compra.fechaVencimiento): "Sin fecha"}
                  </TableCell>
                  <TableCell>{tiposEgresos.find(tipo => tipo.idTipoEgreso === compra.tipoEgreso)?.descripcion ?? "no encontrado"}</TableCell>

                  <TableCell>
                    <Button color="error" onClick={() => eliminarCompra(index)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEnviarCompras}
          >
            Generar Compras
          </Button>
      </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">
            Total de Compras:{" "}
            {separadorMiles(
              compras.reduce((total, compra) => total + compra.cantidad, 0),
              true
            )}
          </Typography>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default FormCompras;
