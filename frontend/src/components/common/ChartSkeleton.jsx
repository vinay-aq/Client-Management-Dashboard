import { Card, Box, CardContent, Skeleton } from "@mui/material";

function ChartSkeleton() {
  return (
    <Card>
      <CardContent
        elevation={1}
        sx={{
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 3,
          }}
        >
          <Skeleton variant="circular" width={220} height={220} />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Skeleton variant="text" width="35%" height={28} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChartSkeleton;
