import { useEffect, useState } from "react";
import { clientSchema } from "../../features/clients/clientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function ClientForm({ initialFormData, loading, submitLabel, onSubmit }) {
  const [previewImage, setPreviewImage] = useState(
    initialFormData?.avatar
      ? `http://localhost:8000${initialFormData?.avatar}`
      : "",
  );
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields },
    reset,
  } = useForm({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name: </label>
      <input type="text" {...register("name")} placeholder="Name" />
      {touchedFields.name && errors.name && <p>{errors.name.message}</p>}

      <br />
      <br />
      <label>Email: </label>
      <input type="text" {...register("email")} placeholder="Email" />
      {touchedFields.email && errors.email && <p>{errors.email.message}</p>}

      <br />
      <br />
      <label>Company: </label>
      <input type="text" {...register("company")} placeholder="Company" />
      {touchedFields.company && errors.company && (
        <p>{errors.company.message}</p>
      )}

      <br />
      <br />
      <label>Phone: </label>
      <input type="text" {...register("phone")} placeholder="Phone" />
      {touchedFields.phone && errors.phone && <p>{errors.phone.message}</p>}

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
              previewImage || `http://localhost:8000${initialFormData?.avatar}`
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
      <button type="submit" disabled={loading || isSubmitting || !isDirty}>
        {loading ? "loading..." : submitLabel}{" "}
      </button>
    </form>
  );
}

export default ClientForm;
