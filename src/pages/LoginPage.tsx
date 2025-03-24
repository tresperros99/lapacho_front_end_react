import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import lapachoLogo from "../assets/login/lapacho_logo.jpg";
import { fetchLogin } from "../features/auth/authThunk";
import Copyright from "../components/genericos/Shared/Copyright";
import es from "../locales/es";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loadingToken } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const usuario = data.get("email");
    const pass = data.get("password");
    if (usuario && pass) {
      dispatch(
        fetchLogin({
          usuario: usuario.toString().trim(),
          contraseña: pass.toString().trim(),
        }),
      );
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${lapachoLogo})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {es.common.labels.login.login}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={es.common.labels.login.email}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={es.common.labels.login.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!loadingToken ? (
                <Typography>{es.common.labels.login.password}</Typography>
              ) : (
                <CircularProgress
                  disableShrink
                  size={24}
                  sx={{ color: "white" }}
                />
              )}
            </Button>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
