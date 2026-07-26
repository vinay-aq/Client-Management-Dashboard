import React from "react";
import DataTable from "../table/DataTable";
import { useSelector } from "react-redux";

function MastersTable() {
  
  const { masters, isFetchingMasters } = useSelector((state) => state?.masters);

  function onEdit(id) {
    console.log(id);
  }

  function onDelete(id) {}

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
      header: "Is Active",
      accessor: "isActive",
      render: (row) => {
        return row.isActive ? "Yes" : "No";
      },
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => {
        return (
          <>
            <button
              style={{ cursor: "pointer", margin: "auto", display: "flex" }}
              onClick={() => onEdit(row._id)}
            >
              Edit
            </button>
            <button
              style={{ cursor: "pointer", margin: "auto", display: "flex" }}
              onClick={() => onDelete(row._id)}
            >
              Delete
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <DataTable
        columns={columns}
        data={masters}
        loading={isFetchingMasters}
        emptyMessage="Masters not found"
      />
    </div>
  );
}

export default MastersTable;
