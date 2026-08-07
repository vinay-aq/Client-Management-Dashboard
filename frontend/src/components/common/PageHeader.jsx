import { Box, Stack, Typography } from "@mui/material";

function PageHeader({ title, subtitle, action }) {
  return (
    <Box sx={{mb:4}}>
      <Stack direction="column" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">{title}</Typography>
        </Box>
        {subtitle && (
          <Box>
            <Typography variant="body2" color="text.secondary" mt="0.5">
              {subtitle}
            </Typography>
          </Box>
        )}
        {action}
      </Stack>
    </Box>
  );
}

export default PageHeader;
