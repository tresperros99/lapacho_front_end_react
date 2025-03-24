import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface YearSelectorProps {
  onYearSelect: (year: number | null) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ onYearSelect }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <Autocomplete
      options={years}
      getOptionLabel={(option) => option.toString()}
      onChange={(_event, newValue) => {
        onYearSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Seleccionar Año" variant="outlined" />
      )}
    />
  );
};

export default YearSelector;
