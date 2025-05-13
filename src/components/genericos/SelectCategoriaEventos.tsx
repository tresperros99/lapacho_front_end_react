import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useCallback, useEffect, useState } from "react";
import { getCategoriaEventos } from "../../api/ApiEventos";
import { CategoriasEvento } from "../../models/responses/eventos/ObtenerCategoriasEventos.response";

interface SelectMesasDelClubProps {
  fullWidth: boolean;
  idEvento: number;
  setCategoriaEvento: React.Dispatch<React.SetStateAction<CategoriasEvento | null>>;
}

const SelectCategoriaEvento: React.FC<SelectMesasDelClubProps> = ({
  fullWidth,
  idEvento,
  setCategoriaEvento,
}) => {
  const [seleccionado, setSeleccionado] = useState(0);
  const [loadingCategoria, setLoadingCategoria] = useState(false);
  const [categoriasEventos, setCategoriasEventos] = useState<CategoriasEvento[]>([])
    const fetchCategoriaEvento = useCallback(async () => {
      try {
        setLoadingCategoria(true);
        if (idEvento) {
          const categoriaEventoResp = await getCategoriaEventos(idEvento);
          if (!categoriaEventoResp) {
          return
          } 
          setCategoriasEventos(categoriaEventoResp.categoriasEvento);

        }
      } finally {
        setLoadingCategoria(false);
      }
    }, [idEvento]);

  useEffect(() => {
    fetchCategoriaEvento()
  }, [fetchCategoriaEvento]);

  const handleCategoriaEventoChange = (event: SelectChangeEvent<number>) => {
    const categoriaEventoId = event.target.value;    
    const categoriaSeleccioanda = categoriasEventos.find(
      (categoria) => categoria.idCategoria === categoriaEventoId,
    );
    if (categoriaSeleccioanda) {
    setCategoriaEvento(categoriaSeleccioanda);
} else {
    setCategoriaEvento(null);
    }
  };

  return (
    <Box>
      { loadingCategoria ? (
        <CircularProgress />
      ) : (
              <Select
        sx={{
          mt: 1,
        }}
        margin="dense"
        fullWidth={fullWidth}
        value={seleccionado === 0 ? "" : seleccionado}
        onChange={handleCategoriaEventoChange}
      >
        {categoriasEventos.length > 0 ? (
          categoriasEventos.map((categoria, index) => (
            <MenuItem
              onClick={() => setSeleccionado(categoria.idCategoria)}
              key={categoria.descripcion + index}
              value={categoria.idCategoria}
            >
              {categoria.descripcion}
            </MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Select>
      )

      }

    </Box>
  );
};

export default SelectCategoriaEvento;
