import { useNavigate } from "react-router-dom";
import DataTable from "../table/DataTable";
import StatusBadge from "../table/StatusBadge";

function ClientsTable({ clients }) {
  const navigate = useNavigate();

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Company",
      accessor: "company",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => {
        return (
          <div style={{textAlign: 'center'}}>
             <StatusBadge status={row.status}/>
          </div>
         
        )
      }
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => {
        return (
          <button
            style={{ cursor: "pointer", margin: 'auto', display:'flex' }}
            onClick={() => navigate(`/clients/${row._id}`)}
          >
            View
          </button>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={clients}
      emptyMessage={"No clients data"}
    />
  );
}

export default ClientsTable;
