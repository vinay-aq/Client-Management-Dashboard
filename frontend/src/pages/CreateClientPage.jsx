import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient } from "../features/clients/clientSlice";
import ClientForm from "../components/clients/ClientForm";
import toast from "react-hot-toast";

function CreateClientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreatingClient, error } = useSelector((state) => state.clients);

  async function handleCreateClient(data) {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("company", data.company)
    formData.append("status", data.status)
    if(data?.avatar[0]) {
       formData.append("avatar", data.avatar[0])
    }
    const result = await dispatch(createClient(formData));
    if (createClient.fulfilled.match(result)) {
      toast.success("Client created successfully")
      navigate("/clients");
    } else {
      toast.error(result.payload || "Failed to create client");
    }
  }

  return (
    <>
      <ClientForm
        loading={isCreatingClient}
        submitLabel="Create Client"
        onSubmit={handleCreateClient}
      />

      {error && <p>{error}</p>}
    </>
  );
}

export default CreateClientPage;
