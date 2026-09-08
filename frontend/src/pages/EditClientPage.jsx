import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateClient, fetchClientById } from "../features/clients/clientSlice";
import { useParams } from "react-router-dom";
import ClientForm from "../components/clients/ClientForm";
import toast from "react-hot-toast";
import { fetchMastersData } from "../features/master/masterSlice";
import { MASTER_TYPES } from "../constants/masterTypes";

function EditClientPage() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUpdatingClient, error, selectedClient } = useSelector(
    (state) => state.clients,
  );
  const { id } = useParams();
  const { clientType, industry } = useSelector((state) => state.masters);

  useEffect(() => {
    dispatch(fetchClientById(id));
  }, []);

  useEffect(() => {
    setFormData({
      name: selectedClient?.name || "",
      email: selectedClient?.email || "",
      phone: selectedClient?.phone || "",
      company: selectedClient?.company || "",
      status: selectedClient?.status || "",
      avatar: selectedClient?.avatar || "",
    });
  }, [selectedClient]);

  async function handleUpdateClient(data) {
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

    const result = await dispatch(updateClient({ id, data: formData }));
    if (updateClient.fulfilled.match(result)) {
      toast.success("Client updated successfully");
      navigate(`/clients`);
    } else {
      toast.error(result.payload || "Failed to update client");
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
      <h2>Update Client</h2>
      <ClientForm
        initialFormData={formData}
        loading={isUpdatingClient}
        submitLabel="Update Client"
        onSubmit={handleUpdateClient}
      />
    </>
  );
}

export default EditClientPage;
