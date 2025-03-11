import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store'; // Ajustar el path según tu estructura
import { fetchTipoSocio } from '../../features/actions/socios.action';



interface SelectTipoSocioProps {
  name: string;
  value: any;
  onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText?: string;
}

export const SelectTipoSocio: React.FC<SelectTipoSocioProps> = ({ 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText 
}) => {
  const dispatch = useAppDispatch();
  const { tipoSocios } = useSelector((state: RootState) => state.socios); // Cambiar según el slice de estado correspondiente
  const { loadingTipoSocios } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (!tipoSocios.length) {
      dispatch(fetchTipoSocio());
    }
  }, [dispatch, tipoSocios.length, loadingTipoSocios]);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="tipo-socio-label">Tipo de Socio</InputLabel>
      {loadingTipoSocios ? (
        <Grid container justifyContent={'center'}>
          <CircularProgress />
        </Grid>
      ) : (
        <Select
          labelId="tipo-socio-label"
          id="idTipoSocio"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label="Tipo de Socio"
        >
          {tipoSocios.map((tipo) => (
            <MenuItem key={tipo.idTipoSocio} value={tipo.idTipoSocio}>
              {tipo.descTipoSocio}
            </MenuItem>
          ))}
        </Select>
      )}
      {helperText && <div style={{ color: 'red' }}>{helperText}</div>}
    </FormControl>
  );
};
