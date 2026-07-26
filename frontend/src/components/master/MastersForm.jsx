import React from "react";
import { useForm } from "react-hook-form";

function MastersForm() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      value: "",
      description: "",
    },
  });
  return <div>MastersForm</div>;
}

export default MastersForm;
