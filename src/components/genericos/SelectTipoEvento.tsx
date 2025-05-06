import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchTipoEvento } from "../../features/actions/eventos.action";
import { TiposEvento } from "../../models/responses/eventos/TipoEvento.response";

interface SelectMesasDelClubProps {
  fullWidth: boolean;
  setTipoEvento: React.Dispatch<React.SetStateAction<TiposEvento | null>>;
}

const SelectTipoEvento: React.FC<SelectMesasDelClubProps> = ({
  fullWidth,
  setTipoEvento,
}) => {
  const { tipoEvento } = useSelector((state: RootState) => state.eventos);
  const dispatch = useAppDispatch();
  const [seleccionado, setSeleccionado] = useState(0);
  useEffect(() => {
    if (!tipoEvento.length) {
      dispatch(fetchTipoEvento());
    }
  }, [dispatch, tipoEvento]);

  const handleMesaDisponibleChange = (event: SelectChangeEvent<number>) => {
    const tipoEventoId = event.target.value;    
    const tipoSeleccionado = tipoEvento.find(
      (tipo) => tipo.idTipoEvento === tipoEventoId,
    );
    if (tipoSeleccionado) {
    setTipoEvento(tipoSeleccionado);
} else {
    setTipoEvento(null);
    }
  };

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
        {tipoEvento.length > 0 ? (
          tipoEvento.map((tipo, index) => (
            <MenuItem
              onClick={() => setSeleccionado(tipo.idTipoEvento)}
              key={tipo.descTipoEvento + index}
              value={tipo.idTipoEvento}
            >
              {tipo.descTipoEvento}
            </MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Select>
    </Box>
  );
};

export default SelectTipoEvento;
