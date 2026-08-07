import React from "react";
import DataTable from "../table/DataTable";
import { AppButton } from "../common";

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
            <AppButton
              sx={{ cursor: "pointer", mb: 1, mx: "auto", display: "flex" }}
              onClick={() => onEdit(row)}
            >
              Edit
            </AppButton>
            <AppButton
              style={{ cursor: "pointer", margin: "auto", display: "flex" }}
              onClick={() => onDelete(row)}
            >
              Delete
            </AppButton>
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
