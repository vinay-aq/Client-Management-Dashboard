import { Box, Button, Stack, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

function EmptyState({
  title = "No Records found",
  description,
  icon,
  action,
  actionText,
  onAction,
  minHeight = 240,
}) {
  return (
    <Box
      sx={{
        minHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Stack spacing={1.5} alignItems="center" maxWidth={420}>
        {icon || (
          <InboxOutlinedIcon
            sx={{
              fontSize: 48,
              color: "text.secondary",
              m: "auto !important",
            }}
          />
        )}

        <Typography>{title}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}

        {action && action}

        {!action && actionText && onAction && (
          <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
            {actionText}
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default EmptyState;
