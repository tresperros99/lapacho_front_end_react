import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchMesasDisponibles } from "../../features/actions/club.actions";
import { MesasDisponible } from "../../models/responses/clases/MesasDisponibles.response";

interface SelectMesasDelClubProps {
  fullWidth: boolean;
  setMesaSeleccionada: React.Dispatch<
    React.SetStateAction<MesasDisponible | null>
  >;
}

const SelectMesasDelClub: React.FC<SelectMesasDelClubProps> = ({
  fullWidth,
  setMesaSeleccionada,
}) => {
  const { mesasDisponibles } = useSelector((state: RootState) => state.club);
  const dispatch = useAppDispatch();
  const [seleccionado, setSeleccionado] = useState(0);
  useEffect(() => {
    if (!mesasDisponibles.length) {
      dispatch(fetchMesasDisponibles());
    }
  }, [dispatch, mesasDisponibles]);

  const handleMesaDisponibleChange = (event: SelectChangeEvent<number>) => {
    const mesaId = event.target.value;
    const mesaSeleccionada = mesasDisponibles.find(
      (mesa) => mesa.idMesa === mesaId
    );
    if (mesaSeleccionada) {
      setMesaSeleccionada(mesaSeleccionada);
    } else {
      setMesaSeleccionada(null);
    }
  };

  return (
    <Box>
      <Select
        fullWidth={fullWidth}
        value={seleccionado === 0 ? "" : seleccionado}
        onChange={handleMesaDisponibleChange}
      >
        {mesasDisponibles.length > 0 ? (
          mesasDisponibles.map((mesa, index) => (
            <MenuItem
              onClick={() => setSeleccionado(mesa.idMesa)}
              key={mesa.idMesa + index}
              value={mesa.idMesa}
            >
              {mesa.descMesa}
            </MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Select>
    </Box>
  );
};

export default SelectMesasDelClub;
