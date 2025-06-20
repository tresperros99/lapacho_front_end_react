import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchAccesosUsuario } from "../../features/actions/auth.action";

interface SelectAccesoUsuarioProps {
  name: string;
  value: number;
  onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText?: string;
}

export const SelectAccesoUsuario: React.FC<SelectAccesoUsuarioProps> = ({
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const dispatch = useAppDispatch();
  const { accesosUsuario } = useSelector((state: RootState) => state.auth);
  const { loadingAccesosUsuario } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (!accesosUsuario.length) {
      dispatch(fetchAccesosUsuario());
    }
  }, [dispatch, accesosUsuario.length, loadingAccesosUsuario]);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="acceso-label">Tipo de Acceso</InputLabel>
      {loadingAccesosUsuario ? (
        <Grid container justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : (
        <Select
          labelId="acceso-label"
          id="idAcceso"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label="Tipo de Acceso"
        >
          {accesosUsuario.map((acceso) => (
            <MenuItem key={acceso.idRolUsuario} value={acceso.idRolUsuario}>
              {acceso.descripcionRol}
            </MenuItem>
          ))}
        </Select>
      )}
      {helperText && <div style={{ color: "red" }}>{helperText}</div>}
    </FormControl>
  );
};
