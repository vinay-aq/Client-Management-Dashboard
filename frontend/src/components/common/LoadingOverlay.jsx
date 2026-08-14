import { Box, CircularProgress } from "@mui/material";

function LoadingOverlay({
  loading = false,
  message,
  children,
  minheight = 200,
}) {
  return (
    <Box sx={{ position: "relative", minHeight: loading ? minheight : "auto" }}>
      {children}{" "}
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1.5,
            backgroundColor: "background.paper",
            opacity: 0.85,
            zIndex: 1,
          }}
        >
          <CircularProgress size={32} />{" "}
          {message && (
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
              }}
            >
              {message}
            </Box>
          )}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default LoadingOverlay;
