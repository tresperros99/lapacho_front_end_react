import { Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
	nombre: yup.string().required('El nombre es requerido'),
	ci: yup.string().required('La Cedula es requerida'),
	precio: yup.string().required('El precio por hora es requerido'),
	telefono: yup.string().required('El telefono es requerido'),
});


const FormProfesores = () => {
	const formik = useFormik({
		initialValues: {
			nombre: '',
			ci: '',
			precio: '',
			telefono: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			 alert(JSON.stringify(values, null, 2));
		},
	  });
  return (
	<div>
		<form onSubmit={formik.handleSubmit}>
		<Typography textAlign={'center'} variant='h4'marginBottom={2}>Creacion de Profesores</Typography>
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
					id="ci"
					name="ci"
					label="Numero de cedula"
					value={formik.values.ci}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.ci && Boolean(formik.errors.ci)}
					helperText={formik.touched.ci && formik.errors.ci}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="precio"
					name="precio"
					label="Precio por Hora"
					value={formik.values.precio}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.precio && Boolean(formik.errors.precio)}
					helperText={formik.touched.precio && formik.errors.precio}
				/>
			</Grid2>
			<Grid2 xs={6}>
				<TextField
					fullWidth
					id="telefono"
					name="telefono"
					label="Telefono"
					value={formik.values.telefono}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.telefono && Boolean(formik.errors.telefono)}
					helperText={formik.touched.telefono && formik.errors.telefono}
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

export default FormProfesores;