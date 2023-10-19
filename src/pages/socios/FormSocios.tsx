import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { actualizarSocio, crearNuevoSocio } from '../../api/ApiSocios';
import NuevoSocioDto from '../../models/dtos/socios/NuevoSocioDto.model';
import { SociosFormateado } from '../../models/responses/socios/NominaSocios.response';

const validationSchema = yup.object({
	nombre: yup.string().required('El nombre es requerido'),
	apellido: yup.string().required('El apellido es requerido'),
	cedula: yup.string().required('La cedula es requerida'),
	fechaNacimiento: yup.string().required('La fecha de nacimiento es requerida'),
	correo: yup.string().required('El correo es requerido'),
	numeroTel: yup.string().required('El numero de telefono es requerido'),
	direccion: yup.string().required('La direccion es requerida'),
	ruc: yup.string().required('La Cedula/Ruc es requerido'),
	tipoSocio: yup.string().required('El tipo de usuario es requerido'),
	idAcceso: yup.string().required('Debe seleccionar un tipo de acceso'),
	contraseña: yup.string().required('La contraseña es requerida'),
});
const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
	return new Date(dateString).toLocaleDateString('es-ES', options);
  }
  

const FormSocios = () => {
	const location = useLocation();
	const socioCargado = location.state as SociosFormateado;

	// const profesorCargado = location.state as ProfesoresFormateado;
	const formik = useFormik<NuevoSocioDto>({
		initialValues:
		{
			nombre:socioCargado?.nombre ?? '',
			apellido:socioCargado?.apellido ?? '',
			cedula:socioCargado?.cedula ?? '',
			fechaNacimiento: socioCargado?.fechaNacimiento.toString() ?? '',
			correo:socioCargado? 'mail@mail': '',
			numeroTel: socioCargado?.numeroTel ?? '',
			direccion: socioCargado?.direccionSocio ?? '',
			ruc: socioCargado?.cedula ?? '',
			tipoSocio:1,
			contraseña:'',
			estadoSocio:1,
			idAcceso:1,
			nombreUsuario:'test'
		},
		validationSchema: validationSchema,
		onSubmit:async (nuevoSocio:NuevoSocioDto) => {
			console.log(nuevoSocio);
			
			if (socioCargado !== null) {
				//TODO: actualizar nuevo socio
				await actualizarSocio(socioCargado.idSocio,{...nuevoSocio,fechaNacimiento:formatDate(nuevoSocio.fechaNacimiento)});


			}else{
				await crearNuevoSocio({...nuevoSocio,fechaNacimiento:formatDate(nuevoSocio.fechaNacimiento)});
			}

		},
	  });

	  
  return (
	<div>
		<form onSubmit={formik.handleSubmit}>
		<Typography textAlign={'center'} variant='h4'marginBottom={2}>Creacion de Socios</Typography>
		<Grid2 container spacing={2} xs={12}>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="nombre"
					name="nombre"
					label="Nombre"
					value={formik.values.nombre}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.nombre && Boolean(formik.errors.nombre)}
					helperText={formik.touched.nombre && formik.errors.nombre}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="apellido"
					name="apellido"
					label="Apellido"
					value={formik.values.apellido}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.apellido && Boolean(formik.errors.apellido)}
					helperText={formik.touched.apellido && formik.errors.apellido}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="cedula"
					name="cedula"
					label="Cedula"
					value={formik.values.cedula}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.cedula && Boolean(formik.errors.cedula)}
					helperText={formik.touched.cedula && formik.errors.cedula}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					type='date'
					id="fechaNacimiento"
					name="fechaNacimiento"
					label="Fecha de Nacimiento"
					InputLabelProps={{shrink:true}}
					value={formik.values.fechaNacimiento}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
					helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
				/>
			</Grid2>
			<Grid2 xs={6}>
			<FormControl fullWidth>
				<InputLabel id="acceso-label">Selecciona un tipo de acceso</InputLabel>
				<Select
				labelId="acceso-label"
				id="idAcceso"
				label="Tipo de acceso"
				>
				<MenuItem value={1}>Acceso total </MenuItem>
				<MenuItem value={2}>Acceso normal </MenuItem>
				<MenuItem value={3}>Acceso profesor </MenuItem>
				</Select>
			</FormControl>
			{formik.touched.idAcceso && formik.errors.idAcceso ? (
				<div style={{ color: 'red' }}>{formik.errors.idAcceso}</div>
			) : null}
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="correo"
					name="correo"
					label="Correo"
					value={formik.values.correo}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.correo && Boolean(formik.errors.correo)}
					helperText={formik.touched.correo && formik.errors.correo}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="numeroTel"
					name="numeroTel"
					label="Numero de Telefono"
					value={formik.values.numeroTel}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.numeroTel && Boolean(formik.errors.numeroTel)}
					helperText={formik.touched.numeroTel && formik.errors.numeroTel}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="direccion"
					name="direccion"
					label="Direccion"
					value={formik.values.direccion}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.direccion && Boolean(formik.errors.direccion)}
					helperText={formik.touched.direccion && formik.errors.direccion}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="ruc"
					name="ruc"
					label="Ruc"
					value={formik.values.ruc}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.ruc && Boolean(formik.errors.ruc)}
					helperText={formik.touched.ruc && formik.errors.ruc}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="contraseña"
					name="contraseña"
					type='password'
					label="password"
					value={formik.values.contraseña}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.contraseña && Boolean(formik.errors.contraseña)}
					helperText={formik.touched.contraseña && formik.errors.contraseña}
				/>
			</Grid2>
			<Grid2 xs={12}>
				<Button color="primary" variant="contained" fullWidth type="submit">
					Crear
				</Button>
			</Grid2>


		</Grid2>
		</form>
	</div>
  )
}

export default FormSocios;