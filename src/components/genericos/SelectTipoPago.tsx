import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { TiposPago } from "../../models/responses/caja/ObtenerTipoPago.response";
import { fetchTipoPago } from "../../features/actions/caja.actions";

interface SelectMesasDelClubProps {
  fullWidth: boolean;
  setTipoPago: React.Dispatch<React.SetStateAction<TiposPago | null>>;
}

const SelectTipoPago: React.FC<SelectMesasDelClubProps> = ({
  fullWidth,
  setTipoPago,
}) => {
  const { tipoPago } = useSelector((state: RootState) => state.caja);
  const dispatch = useAppDispatch();
  const [seleccionado, setSeleccionado] = useState(0);
  useEffect(() => {
    if (!tipoPago.length) {
      dispatch(fetchTipoPago());
    }
  }, [dispatch, tipoPago]);

  const handleMesaDisponibleChange = (event: SelectChangeEvent<number>) => {
    const tipoPagoId = event.target.value;    
    const tipoSeleccionado = tipoPago.find(
      (tipo) => tipo.idTipoPago === tipoPagoId,
    );    
    if (tipoSeleccionado) {
      setTipoPago(tipoSeleccionado);
    } else {
      setTipoPago(null);
    }
  };

  useEffect(() => {
    if (tipoPago) {
      setSeleccionado(tipoPago[0].idTipoPago)
    }
  }, [tipoPago])
  

  return (
    <Box>
      <Select
        sx={{
          mt: 1,
        }}
        margin="dense"
        fullWidth={fullWidth}
        value={seleccionado === 0 ? "" : seleccionado}
        onChange={handleMesaDisponibleChange}
      >
        {tipoPago.length > 0 ? (
          tipoPago.map((tipo, index) => (
            <MenuItem
              onClick={() => setSeleccionado(tipo.idTipoPago)}
              key={tipo.descTipoPago + index}
              value={tipo.idTipoPago}
            >
              {tipo.descTipoPago}
            </MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Select>
    </Box>
  );
};

export default SelectTipoPago;
