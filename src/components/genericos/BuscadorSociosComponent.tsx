import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Socio, SocioPorCedulaResponse } from '../../models/responses/socios/SociosPorCedula.response';

interface BuscadorSociosComponentProps {
    fullWidth: boolean;
    setSocioSeleccionado: React.Dispatch<React.SetStateAction<Socio | null>>;
}

const BuscadorSociosComponent: React.FC<BuscadorSociosComponentProps> = ({ fullWidth, setSocioSeleccionado }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Socio[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get<SocioPorCedulaResponse>(`socio/socio_cedula/nombre?busqueda=${searchTerm}`);
            if (response) {
                setSearchResults(response.data.socio);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleMenuItemClick = (socio: Socio) => {
        setSocioSeleccionado(socio);
        setSearchTerm(socio.nombreUsuario);
        setSearchResults([]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <TextField
                fullWidth={fullWidth}
                label="Socio"
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                onBlur={handleSearch}
                inputRef={inputRef} // Asignar la referencia al input
            />
            {searchResults && searchResults.length > 0 &&
                searchResults.map((socio) => (
                    <MenuItem key={socio.idSocio} onClick={() => handleMenuItemClick(socio)}>{socio.nombreUsuario}</MenuItem>
                ))}
        </div>
    );
};

export default BuscadorSociosComponent;
