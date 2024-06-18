import { Button, Grid, TableFooter, TablePagination, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { getExcelIngresos, getListadoIngresosUsuarios } from '../../api/ApiIngresos';
import { ContainerComponent } from '../../components/genericos/ContainerComponent';
import { separadorMiles } from '../../helpers/Numbers';
import { formatearFechaTipoDate } from '../../helpers/fechas';
import { IngresosXFecha } from '../../models/responses/ingresos/ListadoingresosUsuario.response';

const PanelIngresos = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [listadoIngresos, setListadoIngresos] = useState<IngresosXFecha[]>([]);
    const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
    const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

    useEffect(() => {
        if (fechaHasta !== null) {
            fetchData();
        }
    }, [page, fechaHasta]);

    const fetchData = async () => {
        try {
            const response = await getListadoIngresosUsuarios(
                fechaDesde ? formatearFechaTipoDate(fechaDesde) : '',
                fechaHasta ? formatearFechaTipoDate(fechaHasta) : '',
                (page + 1).toString()
            );
            if (response) {
                setListadoIngresos(response.ingresosXFecha);
            }
        } catch (error) {
            console.error('Error al obtener los ingresos:', error);
        }
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        event
        setPage(newPage);
    };

    const handleDescargarPdf = async () => {
        if (fechaDesde && fechaHasta) {
            const fechaDesdeFormateada = formatearFechaTipoDate(fechaDesde);
            const fechaHastaFormateada = formatearFechaTipoDate(fechaDesde)
            const getPDF = await getExcelIngresos(fechaDesdeFormateada, fechaHastaFormateada)
            if (getPDF) {
                const fileURL = URL.createObjectURL(new Blob([getPDF]));
                const link = document.createElement("a");
                link.href = fileURL;
                link.setAttribute("download", `reporte_${fechaDesdeFormateada}_${fechaHastaFormateada}_.xls`);
                document.body.appendChild(link);
                link.click();
            }
        }
    }

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

                <Grid container item xs={12} justifyContent={`flex-end`}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDescargarPdf}
                        disabled={(!fechaDesde || !fechaHasta)}
                    >
                        Descargar Excel
                    </Button>
                </Grid>

            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingreso</TableCell>
                            <TableCell align="right">Socio</TableCell>
                            <TableCell align="right">Descripcion</TableCell>
                            <TableCell align="right">Monto</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listadoIngresos.map((ingreso) => (
                            <TableRow key={ingreso.idOperacionIngreso}>
                                <TableCell component="th" scope="row">{ingreso.tiposIngreso}</TableCell>
                                <TableCell align="right">{ingreso.nombreCmp}</TableCell>
                                <TableCell align="right">{ingreso.comentario}</TableCell>
                                <TableCell align="right">{separadorMiles(ingreso.monto, true)}</TableCell>
                                <TableCell align="right">{formatearFechaTipoDate(ingreso.fechaCarga)}</TableCell>
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
                                count={listadoIngresos.length}
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

export default PanelIngresos;

