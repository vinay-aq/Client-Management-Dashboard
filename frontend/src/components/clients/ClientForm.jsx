import { useEffect, useState } from "react";
import { clientSchema } from "../../features/clients/clientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function ClientForm({ initialFormData, loading, submitLabel, onSubmit }) {
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
    },
  });

  useEffect(() => {
    reset({
      name: initialFormData?.name || "",
      email: initialFormData?.email || "",
      phone: initialFormData?.phone || "",
      company: initialFormData?.company || "",
      status: initialFormData?.status || "active",
    });
  }, [initialFormData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Client</h2>
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
      {touchedFields.company && errors.company && <p>{errors.company.message}</p>}

      <br />
      <br />
      <label>Phone: </label>
      <input type="text" {...register("phone")} placeholder="Phone" />
      {touchedFields.phone && errors.phone && <p>{errors.phone.message}</p>}

      <br />
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>
      <br />
      <br />
      <button type="submit" disabled={loading || isSubmitting || !isDirty}>
        {loading ? "loading..." : submitLabel}{" "}
      </button>
    </form>
  );
}

export default ClientForm;
