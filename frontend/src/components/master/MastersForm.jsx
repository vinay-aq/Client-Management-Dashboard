import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormTextarea, FormButton } from "../form";

function MastersForm({ isLoading, onSubmit, editingMaster, onClickReset }) {
  const methods = useForm({
    defaultValues: {
      value: "",
      description: "",
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (editingMaster) {
      reset({
        value: editingMaster.value,
        description: editingMaster.description,
      });
    } else {
      reset({
        value: "",
        description: "",
      });
    }
  }, [editingMaster, reset]);

  console.log('methods', methods)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <FormInput
          name="value"
          label="Value"
          required
          rules={{ required: "value is required" }}
          disabled={isLoading}
          sx={{my:1}}
        />
        <FormTextarea
          name="description"
          label="Description"
          disabled={isLoading}
        />
        <FormButton loading={isLoading}>
          {editingMaster ? "Update" : "Create"}
        </FormButton>
        {editingMaster && (
          <FormButton type="button" onClick={onClickReset}>
            Cancel
          </FormButton>
        )}
      </form>
    </FormProvider>
  );
}

export default MastersForm;
