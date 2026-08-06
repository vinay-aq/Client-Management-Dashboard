import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
function FormInput({ name, label, required = false, rules, ...props }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          error={!!errors?.[name]}
          helperText={errors[name]?.message}
          {...props}
        />
      )}
    ></Controller>
  );
}

export default FormInput;
