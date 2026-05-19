import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateClient, fetchClientById } from "../features/clients/clientSlice";
import { useParams } from "react-router-dom";
import ClientForm from "../components/clients/ClientForm";

function EditClientPage() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUpdatingClient, error, selectedClient } = useSelector(
    (state) => state.clients,
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchClientById(id));
  }, []);

  useEffect(() => {
    setFormData({
      name: selectedClient.name || "",
      email: selectedClient.email || "",
      phone: selectedClient.phone || "",
      company: selectedClient.company || "",
      status: selectedClient.status || "",
    });
  }, [selectedClient]);

  async function handleUpdateClient(formData) {
    const result = await dispatch(updateClient({ id, data: formData }));
    if (updateClient.fulfilled.match(result)) {
      navigate(`/clients/${id}`);
    }
  }
  return (
    <>
      <ClientForm
        initialFormData={formData}
        loading={isUpdatingClient}
        submitLabel="Update Client"
        onSubmit={handleUpdateClient}
      />

      {error && <p>{error}</p>}
    </>
  );
}

export default EditClientPage;
