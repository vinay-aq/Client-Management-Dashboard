import React from "react";
import FormField from "./FormField";
import { useFormContext } from "react-hook-form";

function FormInput({ name, label, required, rules, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormField
      name={name}
      label={label}
      required
      error={errors?.[name]?.message}
    >
      <input
        {...register(name, rules)}
        className="w-full rounded border p-2"
        {...props}
      ></input>
    </FormField>
  );
}

export default FormInput;
