import React from "react";
import FormField from "./FormField";
import { Form, useFormContext } from "react-hook-form";

function FormTextarea({ name, rules, label, required, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormField label={label} required error={errors?.[name]?.message}>
      <textarea
        className="w-full rounded border p-2"
        {...register(name, rules)}
        {...props}
      ></textarea>
    </FormField>
  );
}

export default FormTextarea;
