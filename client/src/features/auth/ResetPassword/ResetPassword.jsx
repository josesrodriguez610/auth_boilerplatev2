import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonDefault from "../../../components/ButtonDefault/ButtonDefault";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  /* Password Show handlers */

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography
            component="p"
            sx={{ typography: "subtitle2" }}
            variant="h8"
          >
            Reset your password.
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New password"
            type={showPassword ? "text" : "password"}
            id="newPassword"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="reTypeNewPassword"
            label="Re-type new password"
            type={showPassword ? "text" : "password"}
            id="reTypeNewPassword"
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

          <ButtonDefault title="Email Me" loading={false} />
          <Grid container>
            <Grid
              item
              xs
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Link onClick={() => navigate("/Login")} variant="body2">
                SIGN IN
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
