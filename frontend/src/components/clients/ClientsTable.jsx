import { useNavigate } from "react-router-dom";

function ClientsTable({ clients }) {
  const navigate = useNavigate();

  if (!clients.length) {
    return <h2>No clients data</h2>;
  }
  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client._id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/clients/${client._id}`)}
            >
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsTable;
