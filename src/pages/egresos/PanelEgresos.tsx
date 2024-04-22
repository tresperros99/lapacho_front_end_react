import { Grid, TableFooter, TablePagination, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { getListadoEgresosUsuarios } from '../../api/ApiEgresos'; // Importar la función de egresos
import { ContainerComponent } from '../../components/genericos/ContainerComponent';
import { formatearFechaTipoDate } from '../../helpers/Fechas';
import { EgresosXFecha } from '../../models/responses/egresos/ListadoEgresosUsuario.response';

const PanelEgresos = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [listadoEgresos, setListadoEgresos] = useState<EgresosXFecha[]>([]); // Cambiar el tipo a EgresosXFecha
    const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
    const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

    useEffect(() => {
        // Verificar si fechaHasta está definida
        if (fechaHasta !== null) {
            fetchData(); // Llama a la función para obtener los egresos
        }
    }, [page, fechaHasta]); // Se ejecuta cuando cambia la página o la fecha hasta

    const fetchData = async () => {
        try {
            const response = await getListadoEgresosUsuarios(
                fechaDesde ? formatearFechaTipoDate(fechaDesde) : '',
                fechaHasta ? formatearFechaTipoDate(fechaHasta) : '',
                (page + 1).toString()
            );
            if (response) {
                setListadoEgresos(response.egresosXFecha); // Actualiza el estado con la lista de egresos
            }
        } catch (error) {
            console.error('Error al obtener los egresos:', error);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFechaDesdeChange = (date: Date | null) => {
        setFechaDesde(date);
    };

    const handleFechaHastaChange = (date: Date | null) => {
        setFechaHasta(date);
    };

    return (
        <ContainerComponent>
            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Panel de Egresos</Typography>

            <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="fechaDesde"
                        name="fechaDesde"
                        label="Fecha Desde"
                        type="date"
                        value={fechaDesde ? fechaDesde.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleFechaDesdeChange(new Date(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="fechaHasta"
                        name="fechaHasta"
                        label="Fecha Hasta"
                        type="date"
                        value={fechaHasta ? fechaHasta.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleFechaHastaChange(new Date(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Egreso</TableCell>
                            <TableCell align="right">Socio</TableCell>
                            <TableCell align="right">Descripción</TableCell>
                            <TableCell align="right">Monto</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listadoEgresos.map((egreso) => (
                            <TableRow key={egreso.idOperacionEgreso}>
                                <TableCell component="th" scope="row">{egreso.tiposIngreso}</TableCell>
                                <TableCell align="right">{egreso.nombreCmp}</TableCell>
                                <TableCell align="right">{egreso.comentario}</TableCell>
                                <TableCell align="right">{egreso.monto}</TableCell>
                                <TableCell align="right">{formatearFechaTipoDate(egreso.fechaCarga)}</TableCell>
                                <TableCell align="right">
                                    {/* Botones de edición y eliminación */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={listadoEgresos.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </ContainerComponent>
    );
};

export default PanelEgresos;
