import { useEffect, useState } from "react";
import { clientSchema } from "../../features/clients/clientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput, FormSelect } from "../form";
import { AppButton } from "../common";
import { useSelector } from "react-redux";

function ClientForm({ initialFormData, loading, submitLabel, onSubmit }) {
  const [previewImage, setPreviewImage] = useState(
    initialFormData?.avatar
      ? `http://localhost:8000${initialFormData?.avatar}`
      : "",
  );

  // const [] = useSelector((state) => state.masters);

  const methods = useForm({
    resolver: zodResolver(clientSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "active",
      avatar: null,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields },
    reset,
  } = methods;

  useEffect(() => {
    reset({
      name: initialFormData?.name || "",
      email: initialFormData?.email || "",
      phone: initialFormData?.phone || "",
      company: initialFormData?.company || "",
      status: initialFormData?.status || "active",
      avatar: initialFormData?.avatar || "",
    });
  }, [initialFormData, reset]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          name="name"
          label="Name"
          placeholder="Name"
          rules={{ required: "value is required" }}
        />

        <br />
        <br />
        <FormInput
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          rules={{ required: "email is required" }}
        />

        <br />
        <br />

        <FormInput
          type="text"
          name="company"
          label="Company"
          placeholder="Company"
          rules={{ required: "company is required" }}
        />

        <br />
        <br />
        <FormInput
          type="text"
          name="phone"
          label="Phone"
          placeholder="Phone"
          rules={{ required: "company is required" }}
        />

        <br />
        <br />
        {/* <FormInput
          type="text"
          name="clientTypeId"
          label="Client Type"
          placeholder="Client Type"
          rules={{ required: "Client type is required" }}
        />
        <br />
        <br /> */}

        <FormSelect
          name="clientTypeId"
          label="Type"
          required
          options={[
            { label: "Select Client Type", value: "select" },
            // ...clientTypes?.masters?.map((ct) => ({ value: ct.id, label: ct.name })),
          ]}
          rules={{ required: "Client Type is required" }}
        ></FormSelect>

        <FormSelect
          name="industryId"
          label="Industry"
          required
          options={[
            { label: "Select Industry", value: "select" },
            // ...clientIndustry?.map((ci) => ({ value: ci.id, label: ci.name })),
          ]}
          rules={{ required: "Industry is required" }}
        ></FormSelect>

        <br />
        <br />
        <input
          type="file"
          accept="image/*"
          {...register("avatar", {
            onChange: handleImageChange,
          })}
        />
        {(previewImage || initialFormData?.avatar) && (
          <div>
            <img
              src={
                previewImage ||
                `http://localhost:8000${initialFormData?.avatar}`
              }
              alt="avatar"
              width="120"
              height="120"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
        <br />
        <br />
        <AppButton type="submit" disabled={loading || isSubmitting || !isDirty}>
          {loading ? "loading..." : submitLabel}{" "}
        </AppButton>
      </form>
    </FormProvider>
  );
}

export default ClientForm;
