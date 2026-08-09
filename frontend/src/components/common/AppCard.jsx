import { Card, CardContent } from "@mui/material";

function AppCard({ title, children, action, sx = {}, contentSx = {} }) {
  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        ...sx,
      }}
    >
      {(title || action) && (
        <CardContent
          sx={{
            pb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title && <div>{title}</div>}
          {action}
        </CardContent>
      )}
      <CardContent sx={{ ...contentSx }}>{children}</CardContent>
    </Card>
  );
}

export default AppCard;
