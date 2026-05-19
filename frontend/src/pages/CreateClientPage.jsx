import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient } from "../features/clients/clientSlice";
import ClientForm from "../components/clients/ClientForm";

function CreateClientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreatingClient, error } = useSelector((state) => state.clients);

  async function handleCreateClient(formData) {
    const result = await dispatch(createClient(formData));
    if (createClient.fulfilled.match(result)) {
      navigate("/clients");
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
