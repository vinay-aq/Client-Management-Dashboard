import { Tabs, Tab, Paper } from "@mui/material";

function AppTabs({
  value,
  onChange,
  tabs = [],
  variant = "scrollable",
  scrollbuttons = "auto",
  sx = {},
  ...props
}) {
  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        ...sx,
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant={variant}
        scrollButtons={scrollbuttons}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label}></Tab>
        ))}
      </Tabs>
    </Paper>
  );
}

export default AppTabs;
