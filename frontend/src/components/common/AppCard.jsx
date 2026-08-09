import { Card, CardContent, Typography } from "@mui/material";

function AppCard({ title, children, value, action, sx = {}, contentSx = {} }) {
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
          {title && (
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {title}
            </Typography>
          )}
          {action}
        </CardContent>
      )}
      <CardContent sx={{ ...contentSx }}>
        {value !== undefined ? (
          <Typography variant="h4" fontWeight={700} lineHeight={1.2}>
            {value}
          </Typography>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

export default AppCard;
