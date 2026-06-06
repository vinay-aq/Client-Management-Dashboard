import React from "react";

function DataTable({ columns, data, loading, emptyMessage }) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!data?.length) {
    return <h3>{emptyMessage}</h3>;
  }

  return (
    <div>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              {columns.map((column) => (
                <td key={column.accessor}>{column.render ? column.render(row) : row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
