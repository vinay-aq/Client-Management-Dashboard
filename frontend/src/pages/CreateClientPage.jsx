import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient } from "../features/clients/clientSlice";
import ClientForm from "../components/clients/ClientForm";
import toast from "react-hot-toast";

function CreateClientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreatingClient, error } = useSelector((state) => state.clients);

  async function handleCreateClient(formData) {
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
