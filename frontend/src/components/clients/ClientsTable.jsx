import { useNavigate } from "react-router-dom";
import DataTable from "../table/DataTable";
import StatusBadge from "../table/StatusBadge";
import { AppTable, AppButton } from "../common";

function ClientsTable({ clients, loading}) {
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
          <div>
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
          <AppButton
            style={{ cursor: "pointer", display:'flex' }}
            onClick={() => navigate(`/clients/${row._id}`)}
          >
            View
          </AppButton>
        );
      },
    },
  ];

  return (
    <AppTable
      columns={columns}
      rows={clients}
      emptyMessage={"No clients data"}
      loading={loading}
    />
  );
}

export default ClientsTable;
