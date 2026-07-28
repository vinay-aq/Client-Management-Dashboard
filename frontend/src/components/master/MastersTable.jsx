import React from "react";
import DataTable from "../table/DataTable";

function MastersTable({ onEdit, onDelete, masters, loading }) {
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
              onClick={() => onEdit(row)}
            >
              Edit
            </button>
            <button
              style={{ cursor: "pointer", margin: "auto", display: "flex" }}
              onClick={() => onDelete(row)}
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
        loading={loading}
        emptyMessage="Masters not found"
      />
    </div>
  );
}

export default MastersTable;
