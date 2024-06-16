import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { SociosFormateado, SociosPorNombreApellido } from '../../models/responses/socios/SociosPorCedula.response';

interface BuscadorSociosComponentProps {
    fullWidth: boolean;
    setSocioSeleccionado: React.Dispatch<React.SetStateAction<SociosFormateado | null>>;
}

const BuscadorSociosComponent: React.FC<BuscadorSociosComponentProps> = ({ fullWidth, setSocioSeleccionado }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SociosFormateado[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get<SociosPorNombreApellido>(`/socio/obtener_socios?apellido=${searchTerm}`);
            if (response) {
                setSearchResults(response.data.sociosFormateados);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleMenuItemClick = (socio: SociosFormateado) => {
        setSocioSeleccionado(socio);
        setSearchTerm(socio.nombre);
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
            {searchResults && searchResults.length > 0 &&
                searchResults.map((socio) => (
                    <MenuItem key={socio.idSocio} onClick={() => handleMenuItemClick(socio)}>{socio.nombre}</MenuItem>
                ))}
        </div>
    );
};

export default BuscadorSociosComponent;
