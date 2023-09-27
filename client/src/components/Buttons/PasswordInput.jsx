import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const PasswordInput = ({ title, nameId, password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePwdInput = (e) => setPassword(e.target.value);
  /* Password Show handlers */
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={nameId}
      label={title}
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={handlePwdInput}
      id={nameId}
      autoComplete="current-password"
      InputProps={{
        // <-- This is where the toggle button is added.
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
