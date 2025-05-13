import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type YearSelectorProps = {
  selectedYear: number;
  onChange: (year: number) => void;
  startYear?: number;
  endYear?: number;
  label?: string;
};

const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onChange,
  startYear = new Date().getFullYear() - 10,
  endYear = new Date().getFullYear() + 10,
  label = "Año",
}) => {
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <FormControl fullWidth>
      <InputLabel id="year-select-label">{label}</InputLabel>
      <Select
        labelId="year-select-label"
        value={selectedYear}
        label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearSelector;
