import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../features/clients/clientSlice";
import ClientsTable from "../components/clients/ClientsTable";
import Pagination from "../components/clients/Pagination";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ClientsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const page = Number(searchParams.get("page")) || 1; 
  const limit = Number(searchParams.get("limit")) || 10 ; 


  const { clients, loading, error, totalCount} = useSelector(
    (state) => state.clients,
  );

  useEffect(() => {
    dispatch(fetchClients({ page, limit }));
  }, [dispatch, page, limit]);


  function handlePageChange(newpage) {
    setSearchParams({page: newpage, limit})
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>Clients</h2>
      <button onClick={() => navigate("/clients/createClient")}>Create Client</button>
      <ClientsTable clients={clients} />
      <Pagination page={page} limit={limit}  totalCount={totalCount} onPageChange={handlePageChange}/>

    </div>
  );
}

export default ClientsPage;
