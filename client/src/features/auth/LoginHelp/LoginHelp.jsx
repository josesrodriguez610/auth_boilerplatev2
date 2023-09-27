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
import { useNavigate } from "react-router-dom";

export default function LoginHelp() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

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
          Forgot Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography
            component="p"
            sx={{ typography: "subtitle2" }}
            variant="h8"
          >
            We will send you an email with instructions on how to reset your
            password.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
