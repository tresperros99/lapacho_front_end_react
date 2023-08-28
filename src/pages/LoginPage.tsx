import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import lapachoLogo from '../assets/login/lapacho_logo.jpg';
import { useAppDispatch } from '../app/store';
import { fetchLogin } from '../features/auth/authThunk';
function Copyright(props: any) {
  return (
	<Typography variant="body2" color="text.secondary" align="center" {...props}>
	  {'Copyright © '}
	  <Link color="inherit" href="https://mui.com/">
		Proyecto Lapacho
	  </Link>{' '}
	  {new Date().getFullYear()}
	  {'.'}
	</Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
export const LoginPage = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchLogin({usuario:'ADMINISTRADOR_CLUB',contraseña:'Prueb4_X_4dm1n'}))
	}, [dispatch])
	

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
		email: data.get('email'),
		password: data.get('password'),
		});
	};

  return (
	<Grid container component="main" sx={{ height: '100vh' }}>
		<Grid
		  item
		  xs={false}
		  sm={4}
		  md={7}
		  sx={{
			backgroundImage: `url(${lapachoLogo})`,
			backgroundRepeat: 'no-repeat',
			backgroundColor: (t) =>
			  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		  }}
		/>
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
		  <Box
			sx={{
			  my: 8,
			  mx: 4,
			  display: 'flex',
			  flexDirection: 'column',
			  alignItems: 'center',
			}}
		  >
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
			  <LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
			  Iniciar Sesion
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
			  <TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email"
				name="email"
				autoComplete="email"
				autoFocus
			  />
			  <TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Contraseña"
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
				Iniciar Sesion
			  </Button>
			  <Grid container>
				<Grid item xs>
				  <Link href="#" variant="body2">
					Olvidaste la Contraseña
				  </Link>
				</Grid>
				<Grid item>
				  <Link href="#" variant="body2">
					{"Create una!!"}
				  </Link>
				</Grid>
			  </Grid>
			  <Copyright sx={{ mt: 5 }} />
			</Box>
		  </Box>
		</Grid>
	</Grid>
  );
}
export default LoginPage;