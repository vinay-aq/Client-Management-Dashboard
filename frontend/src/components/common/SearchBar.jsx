import { InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar({
  onChange,
  placeholder = "",
  value = "",
  size = "small",
  fullWidth = false,
  disabled = false,
  sx = {},
}) {
  function handleChange(e) {
    onChange?.(e.target.value);
  }

  function handleClear(e) {
    onChange?.("");
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
                aria-label="clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      placeholder={placeholder}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{ minWidth: 280, ...sx }}
    />
  );
}

export default SearchBar;
