import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FormTextarea({
  name,
  rules,
  label,
  required = false,
  disabled = false,
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
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          error={!!errors[name]}
          disabled={disabled}
          multiline
          helperText={errors[name]?.message}
          className="w-full rounded border p-2"
          {...props}
        />
      )}
    ></Controller>
  );
}

export default FormTextarea;
