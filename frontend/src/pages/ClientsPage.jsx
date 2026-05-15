import { useEffect, useState } from "react";
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
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);

  const { clients, isFetchingClients, error, totalCount } = useSelector(
    (state) => state.clients,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({
        page: 1,
        limit: limit,
        search: searchInput,
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  useEffect(() => {
    const promise = dispatch(fetchClients({ page, limit, search }));

    return () => {
      promise.abort();
    };
  }, [dispatch, page, limit, search]);

  function handlePageChange(newpage) {
    setSearchParams({ page: newpage, limit, search });
  }

  return (
    <div>
      <h2>Clients</h2>
      <input
        type="text"
        placeholder="search name or email"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <button onClick={() => navigate("/clients/createClient")}>
        Create Client
      </button>
      {error && <h2>{error}</h2>}

      {isFetchingClients ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <ClientsTable clients={clients} />
          <Pagination
            page={page}
            limit={limit}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default ClientsPage;
