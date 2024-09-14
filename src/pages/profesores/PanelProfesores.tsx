import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Grid, TableFooter, TablePagination, Typography } from '@mui/material';
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
    const [orderBy, setOrderBy] = useState<{ column: string, direction: 'asc' | 'desc' }>({ column: 'nombreProfesor', direction: 'asc' });

    useEffect(() => {
        if (nominaProfesores.length <= 0) {
            dispatch(fetchNominaProfesores());
        }
    }, [dispatch, nominaProfesores.length]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const editarProfesor = (profesor: ProfesoresFormateado) => {
        navigate('/formProfesor', { state: profesor });
    };

    const eliminarProfesor = async (idProfesor: number) => {
        await crearActualizarEliminarProfesor('eliminar', undefined, idProfesor);
    };

    const nuevoProfesor = () => {
        navigate('/formProfesor');
    };

    const handleSort = (column: string) => {
        const isAsc = orderBy.column === column && orderBy.direction === 'asc';
        setOrderBy({ column, direction: isAsc ? 'desc' : 'asc' });
    };

    const sortedProfesores = [...nominaProfesores].sort((a, b) => {
        if (orderBy.column === 'nombreProfesor') {
            return orderBy.direction === 'asc' ? a.nombreProfesor.localeCompare(b.nombreProfesor) : b.nombreProfesor.localeCompare(a.nombreProfesor);
        }
        if (orderBy.column === 'estadoProfesor') {
            return orderBy.direction === 'asc' ? a.estadoProfesor.localeCompare(b.estadoProfesor) : b.estadoProfesor.localeCompare(a.estadoProfesor);
        }
        return 0;
    });

    return (
        <ContainerComponent>
            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Panel de Profesores</Typography>

            <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={nuevoProfesor}>
                    Nuevo Profesor
                </Button>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => handleSort('nombreProfesor')} style={{ cursor: 'pointer' }}>
                                Nombre {orderBy.column === 'nombreProfesor' && (orderBy.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
                            </TableCell>
                            <TableCell align="right">Costo</TableCell>
                            <TableCell align="right">Documento</TableCell>
                            <TableCell align="right">Contacto</TableCell>
                            <TableCell onClick={() => handleSort('estadoProfesor')} style={{ cursor: 'pointer' }} align="right">
                                Estado {orderBy.column === 'estadoProfesor' && (orderBy.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
                            </TableCell>
                            <TableCell align="right">Editar</TableCell>
                            <TableCell align="right">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProfesores.length > 0 &&
                            sortedProfesores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((profesor) => (
                                <TableRow
                                    key={profesor.nombreProfesor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {profesor.nombreProfesor}
                                    </TableCell>
                                    <TableCell align="right">{separadorMiles(profesor.costoXHora, true)}</TableCell>
                                    <TableCell align="right">{separadorMiles(profesor.cedula,true)}</TableCell>
                                    <TableCell align="right">{profesor.contactoProfesor}</TableCell>
                                    <TableCell align="right">{profesor.estadoProfesor}</TableCell>
                                    <TableCell onClick={() => editarProfesor(profesor)} align="right">
                                        <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
                                    </TableCell>
                                    <TableCell onClick={() => eliminarProfesor(profesor.idProfesor)} align="right">
                                        <DeleteOutlineOutlinedIcon sx={{ cursor: 'pointer' }} />
                                    </TableCell>
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
};

export default PanelProfesores;
