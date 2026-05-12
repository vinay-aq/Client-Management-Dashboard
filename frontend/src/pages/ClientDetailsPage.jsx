import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClientById } from "../features/clients/clientSlice";
import { useParams } from "react-router-dom";

function ClientDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedClient, error, loading } = useSelector(
    (state) => state.clients,
  );

  useEffect(() => {
    dispatch(fetchClientById(id));
  }, [dispatch, id]);

  if(loading) {
    return <h2>Loading...</h2>
  }

  if(loading) {
    return <h2>{error}</h2>
  }

  return (
    <div>
      <p>Name: {selectedClient?.name}</p>
      <p>Email: {selectedClient?.email}</p>
      <p>Phone: {selectedClient?.phone}</p>
      <p>Company: {selectedClient?.company}</p>
      <p>Status: {selectedClient?.status}</p>
    </div>
  );
}

export default ClientDetailsPage;
