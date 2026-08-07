import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function AppTable({
  columns = [],
  rows = [],
  emptyMessage = "No Records found",
  loading = false,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      {loading ? (
        "Loading..."
      ) : (
        <Table
          sx={{
            minWidth: 900,
          }}
        >
          <TableHead>
            {columns.map((column) => (
              <TableCell
                key={column.accessor}
                sx={{
                  fontWeight: 700,
                  bgcolor: "grey.100",
                  borderBottom: 2,
                  borderColor: "divider",
                  whiteSpace: "nowrap",
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} color="text.secondary">
                  <Typography color="text.secondary">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  hover
                  key={row?._id}
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        borderColor: "divider",
                        py: 2,
                      }}
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default AppTable;
