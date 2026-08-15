import {
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  Table
} from "@mui/material";

function TableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton variant="text" width="70%" />
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <TableCell key={columnIndex}>
                  <Skeleton
                    variant="text"
                    width={columnIndex === 0 ? "80%" : "60%"}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableSkeleton;
