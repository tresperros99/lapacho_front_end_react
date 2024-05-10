import { Box, CircularProgress, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { fetchTiposIngresos } from '../../features/actions/Ingresos.action';
import { TiposIngreso } from '../../models/responses/ingresos/TipoIngreso.response';



interface SelectTipoIngresoComponentProps {
    fullWidth: boolean;
    setTipoIngresoSeleccionado: React.Dispatch<React.SetStateAction<TiposIngreso | null>>;
}

const SelectTipoIngresoComponent: React.FC<SelectTipoIngresoComponentProps> = ({ fullWidth, setTipoIngresoSeleccionado }) => {
    const { tiposIngresos } = useSelector((state: RootState) => state.ingresos);
    const dispatch = useAppDispatch();
    const [seleccionado, setSeleccionado] = useState(0);
    useEffect(() => {
        if (!tiposIngresos.length) {
            dispatch(fetchTiposIngresos());

        }

    }, []);



    const handleTipoIngresoChange = (event: SelectChangeEvent<number>) => {
        const tipoIngresoId = event.target.value;
        const tipoIngresoSeleccionado = tiposIngresos.find(tipo => tipo.idTipo === tipoIngresoId);
        if (tipoIngresoSeleccionado) {
            setTipoIngresoSeleccionado(tipoIngresoSeleccionado);
        } else {
            setTipoIngresoSeleccionado(null);
        }
    };

    return (
        <Box>
            <Select
                fullWidth={fullWidth}
                value={seleccionado === 0 ? '' : seleccionado}
                onChange={handleTipoIngresoChange}
            >
                {tiposIngresos.length > 0 ? tiposIngresos.map((tipo, index) => (
                    <MenuItem onClick={() => setSeleccionado(tipo.idTipo)} key={tipo.idTipo + index} value={tipo.idTipo}>{tipo.descripcion}</MenuItem>
                )) :
                    <CircularProgress />
                }
            </Select>
        </Box>
    );
};

export default SelectTipoIngresoComponent;
