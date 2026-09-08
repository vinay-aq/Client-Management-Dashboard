import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient } from "../features/clients/clientSlice";
import ClientForm from "../components/clients/ClientForm";
import toast from "react-hot-toast";
import { fetchMastersData } from "../features/master/masterSlice";
import { MASTER_TYPES } from "../constants/masterTypes";
import { useEffect } from "react";

function CreateClientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCreatingClient, error } = useSelector((state) => state.clients);
  const { clientType, industry } = useSelector((state) => state.masters);

  async function handleCreateClient(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("company", data.company);
    formData.append("status", data.status);
    formData.append("clientTypeId", data.clientTypeId);
    formData.append("industryId", data.industryId);
    if (data?.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    const result = await dispatch(createClient(formData));
    if (createClient.fulfilled.match(result)) {
      toast.success("Client created successfully");
      navigate("/clients");
    } else {
      toast.error(result.payload || "Failed to create client");
    }
  }

  useEffect(() => {
    if (!clientType.length)
      dispatch(fetchMastersData(MASTER_TYPES.CLIENT_TYPE));
    if (!industry.length)
      dispatch(fetchMastersData(MASTER_TYPES.CLIENT_INDUSTRY));
  }, []);

  return (
    <>
      <h2>Create Client</h2>
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
