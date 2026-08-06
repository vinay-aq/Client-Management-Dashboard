import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function FormSelect({
  name,
  label,
  options,
  disabled,
  rules,
  required,
  ...props
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={(field) => (
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors[name]}
          disabled={disabled}
        >
          <InputLabel required={required}>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            className="w-full rounded border p-2"
            {...props}
          >
            {options.map((op) => (
              <MenuItem index={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors?.[name].message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default FormSelect;
