import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import usePersist from "../../../hooks/usePersist";

import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonDefault from "../../../components/ButtonDefault/ButtonDefault";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AlertsDefault from "../../../components/AlertsDefault/AlertsDefault";
import PasswordInput from "../../../components/Buttons/PasswordInput";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ accessToken }));

      setEmail("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  /* Email and Password handlers */
  const handleUserInput = (e) => setEmail(e.target.value);

  /* Persist -- Remember me */
  const handleToggle = () => setPersist((prev) => !prev);

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
        <img
          className="block h-16 w-auto m-3"
          src="https://blox-custom-resources.s3.amazonaws.com/images/companyLogos/the_advocate/LOGO-TheAdvocate-SecondaryMark-Dark.png"
          alt="Your Company"
        />

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <div ref={errRef} aria-live="assertive">
          <AlertsDefault err={true} message={errMsg} />
        </div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            ref={userRef}
            value={email}
            onChange={handleUserInput}
            autoComplete="email"
            autoFocus
          />
          <PasswordInput
            title={"Password"}
            nameId={"password"}
            password={password}
            setPassword={setPassword}
          />
          <FormControlLabel
            onChange={handleToggle}
            checked={persist}
            id="persist"
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ButtonDefault title="SIGN IN" loading={isLoading} />
          <Grid container>
            <Grid
              item
              xs
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* <Link onClick={() => navigate("/LoginHelp")} variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
