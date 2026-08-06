import React from "react";
import { LoadingButton } from "@mui/lab";

function FormButton({
  loading,
  children,
  type = "submit",
  color = "primary",
  variant = "contained",
  ...props
}) {
  return (
    <LoadingButton
      type={type}
      variant={variant}
      color={color}
      disabled={loading}
      loading={loading}
      className="rounded bg-blue-600 px-2 py-2 text-white"
      sx={{
        my: 2,
      }}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}

export default FormButton;
