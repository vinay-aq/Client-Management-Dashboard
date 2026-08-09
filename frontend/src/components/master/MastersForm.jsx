import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormTextarea } from "../form";
import AppButton from "../common/AppButton";

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <FormInput
          name="value"
          label="Value"
          required
          rules={{ required: "value is required" }}
          disabled={isLoading}
          sx={{ my: 1 }}
        />
        <FormTextarea
          name="description"
          label="Description"
          disabled={isLoading}
        />
        <AppButton loading={isLoading} type="submit" sx={{ my: 1 }}>
          {editingMaster ? "Update" : "Create"}
        </AppButton>
        {editingMaster && (
          <AppButton type="button" onClick={onClickReset}>
            Cancel
          </AppButton>
        )}
      </form>
    </FormProvider>
  );
}

export default MastersForm;
