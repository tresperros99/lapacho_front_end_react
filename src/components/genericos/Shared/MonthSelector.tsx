import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type MonthSelectorProps = {
  selectedMonth: number;
  onChange: (month: number) => void;
  label?: string;
};

const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onChange,
  label = "Mes",
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="month-select-label">{label}</InputLabel>
      <Select
        labelId="month-select-label"
        value={selectedMonth}
        label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {months.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelector;
