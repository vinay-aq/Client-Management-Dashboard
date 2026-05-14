import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClientById, deleteClient } from "../features/clients/clientSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ClientDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedClient, error, isFetchingClientDetails, isDeletingClient} = useSelector(
    (state) => state.clients,
  );

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?",
    );
    console.log({confirmed})
    if (!confirmed) {
      return;
    }
    const result = await dispatch(deleteClient(id));
    if (deleteClient.fulfilled.match(result)) {
      navigate("/clients");
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
      <button onClick={handleDeleteClient} disabled={isDeletingClient}>
        {isDeletingClient ? "Deleting..." : "Delete client"}
      </button>
    </div>
  );
}

export default ClientDetailsPage;
