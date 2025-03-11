import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { getBuscadorSocios } from "../../api/ApiSocios";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

interface BuscadorSociosProps {
  onSelect: (socio: Socio | null) => void;
}

const BuscadorSocios: React.FC<BuscadorSociosProps> = ({ onSelect }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [socios, setSocios] = useState<Socio[]>([]);

  const handleSearch = async () => {
    if (searchValue.length > 2) {
      try {
        const response = await getBuscadorSocios(searchValue);
        if (response && response.socios.length > 0) {
          setSocios(response.socios);
        }
      } catch (error) {
        console.error("Error fetching socios:", error);
      }
    }
  };
  const TruncateText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
  `;

  return (
    <Autocomplete
      options={socios}
      noOptionsText="No se encontraron resultados"
      renderOption={(props, option) => (
        <li {...props}>
          <TruncateText>{option.nombreSocio}</TruncateText>
        </li>
      )}
      getOptionLabel={(option) => option.nombreSocio}
      onChange={(_event, newValue) => {
        onSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar Socio"
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default BuscadorSocios;
