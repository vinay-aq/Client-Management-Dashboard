import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClientById, deleteClient } from "../features/clients/clientSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ui/ConfirmModal";

import toast from "react-hot-toast";

function ClientDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();

  const { selectedClient, error, isFetchingClientDetails, isDeletingClient } =
    useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClientById(id));
  }, [dispatch, id]);

  if (isFetchingClientDetails) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  function handleEditClient() {
    navigate(`/clients/${id}/edit`);
  }

  async function handleDeleteClient() {
    const result = await dispatch(deleteClient(id));
    if (deleteClient.fulfilled.match(result)) {
      toast.success("Client deleted successfully");
      navigate("/clients");
    } else {
      toast.error(result.payload || "Failed to delete client");
    }
  }

  return (
    <div>
      <p>Name: {selectedClient?.name}</p>
      <p>Email: {selectedClient?.email}</p>
      <p>Phone: {selectedClient?.phone}</p>
      <p>Company: {selectedClient?.company}</p>
      <p>Status: {selectedClient?.status}</p>
      <button onClick={handleEditClient}>Edit client</button>
      <button onClick={() => setIsDeleteModalOpen(true)} disabled={isDeletingClient}>
        {isDeletingClient ? "Deleting..." : "Delete client"}
      </button>

      <ConfirmModal
        isOpen={iseDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Client"
        message="Are you sure you want to delete this client?"
        onConfirm={handleDeleteClient}
        loading={isDeletingClient}
        confirmText="Delete"
      />
    </div>
  );
}

export default ClientDetailsPage;
