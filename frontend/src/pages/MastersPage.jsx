import React from 'react'
import DataTable from '../components/table/DataTable'

function MastersPage() {

   const columns = [
    {
      header: "Type",
      accessor: "type",
    },
    {
      header: "Value",
      accessor: "value",
    },
    {
      header: "Description",
      accessor: "description",
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
   <div style={{ textAlign: "center" }}>
      <DataTable
        columns={columns}
        data={users}
        loading={isFetchingUsers}
        emptyMessage="Users not found"
      />
    </div>
  )
}

export default MastersPage