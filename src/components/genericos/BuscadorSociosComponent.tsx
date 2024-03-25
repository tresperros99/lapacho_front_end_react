import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Socio, SocioPorCedulaResponse } from '../../models/responses/socios/SociosPorCedula.response';


const BuscadorSociosComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Socio[]>([]);

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


    return (
        <div>
            <TextField
                label="Buscar"
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                onBlur={handleSearch}
            />
            {searchResults && searchResults.length > 0 &&
                searchResults.map((socio) => (
                    <MenuItem key={socio.idSocio}>{socio.nombreUsuario}</MenuItem>
                ))}
        </div>
    );
};

export default BuscadorSociosComponent;