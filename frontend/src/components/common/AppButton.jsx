import Button from "@mui/lab/LoadingButton";

function AppButton({
  children,
  loading = false,
  variant = "contained",
  color = "primary",
  size = "medium",
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  sx = {},
  ...props
}) {
  return (
    <Button
      type={type}
      loading={loading}
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      sx={sx}
      {...props}
    >
      {children}
    </Button>
  );
}

export default AppButton;
