import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormTextarea } from "../form";
import AppButton from "../common/AppButton";
import Box from '@mui/material/Box';

function MastersForm({ isLoading, onSubmit, editingMaster, onClickReset }) {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (editingMaster) {
      reset({
        name: editingMaster.name,
        description: editingMaster.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [editingMaster, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <FormInput
          name="name"
          label="Name"
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
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <AppButton loading={isLoading} type="submit" sx={{ my: 1 }}>
            {editingMaster ? "Update" : "Create"}
          </AppButton>
          {editingMaster && (
            <AppButton type="button" onClick={onClickReset} sx={{ my: 1 }}>
              Cancel
            </AppButton>
          )}
        </Box>
      </form>
    </FormProvider>
  );
}

export default MastersForm;
