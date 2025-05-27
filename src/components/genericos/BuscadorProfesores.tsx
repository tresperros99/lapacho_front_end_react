import {
    Autocomplete,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { getBuscadorProfesores } from "../../api/ApiProfesores";
import { ProfesoresFormateado } from "../../models/responses/profesores/NominaProfesores.response";
import { SearchIcon } from "../icons";

interface BuscadorProfesoresProps {
  onSelect: (socio: ProfesoresFormateado | null) => void;
  margin?: 'dense' | 'normal' | 'none';
}

const BuscadorProfesores: React.FC<BuscadorProfesoresProps> = ({ onSelect,margin='none' }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [profesores, setProfesores] = useState<ProfesoresFormateado[]>([]);

  const handleSearch = async () => {
    if (searchValue.length > 2) {
      try {
        const response = await getBuscadorProfesores(searchValue);
        console.log(response);
        
        if (response && response.profesoresFormateado) {
            console.log('aqui');
            
          setProfesores(response.profesoresFormateado);
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
      options={profesores}
      noOptionsText="No se encontraron resultados"
      renderOption={(props, option) => (
        <li {...props}>
          <TruncateText>{option.nombreProfesor}</TruncateText>
        </li>
      )}
      getOptionLabel={(option) => option.nombreProfesor}
      onChange={(_event, newValue) => {
        onSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar Profesor"
          variant="outlined"
          margin={margin}
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

export default BuscadorProfesores;
