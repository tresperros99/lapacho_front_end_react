import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Socio } from "../../models/responses/socios/SociosPorCedula.response";

interface BuscadorSociosComponentProps {
  fullWidth: boolean;
  setSocioSeleccionado: React.Dispatch<React.SetStateAction<Socio | null>>;
}

const BuscadorSociosComponent: React.FC<BuscadorSociosComponentProps> = ({
  fullWidth,
  setSocioSeleccionado,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Socio[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get<Socio[]>(
        `/socio/obtener_socios?apellido=${searchTerm}`,
      );
      if (response) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMenuItemClick = (socio: Socio) => {
    setSocioSeleccionado(socio);
    setSearchTerm(socio.nombreSocio);
    setSearchResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <TextField
        fullWidth={fullWidth}
        label="Buscador por Nombre/Apellido"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        onBlur={handleSearch}
        inputRef={inputRef}
      />
      {searchResults &&
        searchResults.length > 0 &&
        searchResults.map((socio) => (
          <MenuItem
            key={socio.idCliente}
            onClick={() => handleMenuItemClick(socio)}
          >
            {socio.nombreSocio}
          </MenuItem>
        ))}
    </div>
  );
};

export default BuscadorSociosComponent;
