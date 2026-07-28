import React from "react";
import FormField from "./FormField";
import { useFormContext } from "react-hook-form";

function FormSelect({ name, label, options, rules, required, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField name={name} error={errors?.[name]?.message} required>
      <select {...register(name, rules)} className="w-full rounded border p-2" {...props}>
        {options.map((op) => (
          <option index={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export default FormSelect;
