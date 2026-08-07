import { TextField } from "@mui/material";

function AppInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  fullWidth = true,
  size = "small",
  ...props
}) {
  return (
    <TextField
      label={label}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      {...props}
    >
      AppInput
    </TextField>
  );
}

export default AppInput;
