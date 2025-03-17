import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchTiposEgresos } from "../../features/actions/egresos.action";
import { TiposEgreso } from "../../models/responses/egresos/TipoEgreso.response";

interface SelectTipoEgresoComponentProps {
  fullWidth: boolean;
  setTipoEgresoSeleccionado: React.Dispatch<
    React.SetStateAction<TiposEgreso | null>
  >;
}

const SelectTipoEgresoComponent: React.FC<SelectTipoEgresoComponentProps> = ({
  fullWidth,
  setTipoEgresoSeleccionado,
}) => {
  const { tiposEgresos } = useSelector((state: RootState) => state.egresos);
  const dispatch = useAppDispatch();
  const [seleccionado, setSeleccionado] = useState(0);
  useEffect(() => {
    if (!tiposEgresos.length) {
      dispatch(fetchTiposEgresos());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTipoIngresoChange = (event: SelectChangeEvent<number>) => {
    const tipoEgresoId = event.target.value;
    const tipoEgresoSeleccionado = tiposEgresos.find(
      (tipo) => tipo.idTipo === tipoEgresoId,
    );
    if (tipoEgresoSeleccionado) {
      setTipoEgresoSeleccionado(tipoEgresoSeleccionado);
    } else {
      setTipoEgresoSeleccionado(null);
    }
  };

  return (
    <Box>
      <Select
        fullWidth={fullWidth}
        value={seleccionado === 0 ? "" : seleccionado}
        onChange={handleTipoIngresoChange}
      >
        {tiposEgresos.length > 0 ? (
          tiposEgresos.map((tipo, index) => (
            <MenuItem
              onClick={() => setSeleccionado(tipo.idTipo)}
              key={tipo.idTipo + index}
              value={tipo.idTipo}
            >
              {tipo.descripcion}
            </MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Select>
    </Box>
  );
};

export default SelectTipoEgresoComponent;
