import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClientById,
  deleteClient,
  updateClientWorkflow,
} from "../features/clients/clientSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ui/ConfirmModal";
import usePermission from "../hooks/usePermission";
import { PERMISSIONS } from "../utils/permissions";
import ClientWorkflowSection from "../components/clients/ClientWorkflowSection";
import toast from "react-hot-toast";

function ClientDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdatingWorkflow, setIsUpdatingWorkflow] = useState(false);
  const { id } = useParams();
  const canDeleteClient = usePermission(PERMISSIONS.CLIENT_DELETE);
  const canEditClient = usePermission(PERMISSIONS.CLIENT_EDIT);

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

  async function handleUpdateStatus(nextStatus) {
    try {
      setIsUpdatingWorkflow(true);
      console.log({id, nextStatus})
      await dispatch(updateClientWorkflow({id, nextStatus})).unwrap();
      toast.success("Workflow updated");
    } catch (err) {
      console.log({err})
      toast.error(err || "Failed to updated workflow");
    } finally {
      setIsUpdatingWorkflow(false);
    }
  }

  return (
    <div>
      <p>Name: {selectedClient?.name}</p>
      <p>Email: {selectedClient?.email}</p>
      <p>Phone: {selectedClient?.phone}</p>
      <p>Company: {selectedClient?.company}</p>
      {selectedClient?.avatar && (
        <p>
          <img
            src={`http://localhost:8000${selectedClient?.avatar}`}
            alt="avatar"
            width="120"
            height="120"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </p>
      )}

      <ClientWorkflowSection
        loading={isUpdatingWorkflow}
        currentStatus={selectedClient?.status}
        onUpdateStatus={handleUpdateStatus}
      />

      {canEditClient && <button onClick={handleEditClient}>Edit client</button>}
      {canDeleteClient && (
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isDeletingClient}
        >
          {isDeletingClient ? "Deleting..." : "Delete client"}
        </button>
      )}
      <button onClick={() => navigate("/clients")}>Back to Clients</button>

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
