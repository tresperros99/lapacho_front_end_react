import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { TableFooter, TablePagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { crearActualizarEliminarProfesor } from '../../api/ApiProfesores';
import { RootState, useAppDispatch } from '../../app/store';
import { ContainerComponent } from '../../components/genericos/ContainerComponent';
import { fetchNominaProfesores } from '../../features/profesores/profesoresThunk';
import { separadorMiles } from '../../helpers/Numbers';
import { ProfesoresFormateado } from '../../models/responses/profesores/NominaProfesores.response';
const PanelProfesores = () => {
    const dispatch = useAppDispatch();
    const { nominaProfesores } = useSelector((state: RootState) => state.profesores);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        if (nominaProfesores.length <= 0) {
            dispatch(fetchNominaProfesores())
        }
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const editarProfesor = (profesor: ProfesoresFormateado) => {
        navigate('/formProfesor', { state: profesor });
    }
    const eliminarProfesor = async (idProfesor: number) => {
        await crearActualizarEliminarProfesor('eliminar', undefined, idProfesor)
    }
    return (
        <ContainerComponent>

            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Panel de Profesores</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Costo </TableCell>
                            <TableCell align="right">Documento</TableCell>
                            <TableCell align="right">Contacto</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Editar</TableCell>
                            <TableCell align="right">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nominaProfesores.length > 0 &&
                            nominaProfesores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((profesor) => (
                                <TableRow
                                    key={profesor.nombreProfesor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {profesor.nombreProfesor}
                                    </TableCell>
                                    <TableCell align="right">{separadorMiles(profesor.costoXHora, true)}</TableCell>
                                    <TableCell align="right">{profesor.cedula}</TableCell>
                                    <TableCell align="right">{profesor.contactoProfesor}</TableCell>
                                    <TableCell align="right">{profesor.estadoProfesor}</TableCell>
                                    <TableCell onClick={() => editarProfesor(profesor)} align="right"><EditOutlinedIcon sx={{ cursor: 'pointer' }} /></TableCell>
                                    <TableCell onClick={() => eliminarProfesor(profesor.idProfesor)} align="right"><DeleteOutlineOutlinedIcon sx={{ cursor: 'pointer' }} /></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={nominaProfesores.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </ContainerComponent>
    );
}

export default PanelProfesores;