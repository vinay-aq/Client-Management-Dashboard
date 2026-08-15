import { Card, CardContent, Skeleton } from "@mui/material";

function CardSkeleton() {
  return (
    <Card
      elevation={1}
      sx={{
        minWidth: 180,
        flex: "1 1 180px",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Skeleton variant="text" width="65%" height={24} />
        <Skeleton variant="text" width="40%" height={42} />
      </CardContent>
    </Card>
  );
}

export default CardSkeleton;
