import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function AppSelect({
  label,
  value,
  onChange,
  options,
  fullWidth,
  disabled,
  size,
  sx = {},
}) {
  return (
    <FormControl fullWidth={fullWidth} size={size} disabled={disabled} sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={onChange}>
        {options.map((op) => (
          <MenuItem key={op.value} value={op.value}>
            {op.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default AppSelect;
