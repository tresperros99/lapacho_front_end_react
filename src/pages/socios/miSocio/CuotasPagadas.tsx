import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getCuotasPendientesSocio } from '../../../api/ApiCuotas';
import { ContainerComponent } from '../../../components/genericos/ContainerComponent';
import { formatearFechaTipoDate } from '../../../helpers/fechas';
import { CuotaPagada } from '../../../models/responses/cuotas/ListadoCuotasPendientesSocio.response';
import { separadorMiles } from '../../../helpers/Numbers';

const CuotasPagadas = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [cuotasPagadas, setCuotasPagadas] = useState<CuotaPagada[]>([]);
    const [numeroDocumento, setNumeroDocumento] = useState<string>('');
    const [anio, setAnio] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const fetchData = async () => {
        try {
            const response = await getCuotasPendientesSocio(numeroDocumento, anio);
            if (response) {
                if (Boolean(response.status)) {
                    const cuotasPagadas = response.cuotasPagadas.filter(cuota => cuota.fechaPago !== null);
                    const sortedData = sortData(cuotasPagadas);
                    setCuotasPagadas(sortedData);
                } else {
                    setCuotasPagadas([]);
                }
            } else {
                console.error('Error al obtener las cuotas pendientes:');
            }
        } catch (error) {
            console.error('Error al obtener las cuotas pendientes:', error);
        }
    };

    const sortData = (data: CuotaPagada[]) => {
        return data.sort((a, b) => {
            const monthA = new Date(a.fechaVencimiento).getMonth();
            const monthB = new Date(b.fechaVencimiento).getMonth();
            return sortOrder === 'asc' ? monthA - monthB : monthB - monthA;
        });
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        <ContainerComponent>
            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Panel de Cuotas Pagadas</Typography>

            <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="numeroDocumento"
                        name="numeroDocumento"
                        label="Número de Documento"
                        type="text"
                        value={numeroDocumento}
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel shrink={true} id="anio-label">Año</InputLabel>
                        <Select
                            labelId="anio-label"
                            id="anio"
                            value={anio}
                            label="Año"
                            onChange={(e) => setAnio(e.target.value)}
                            onBlur={fetchData}
                            displayEmpty
                        >
                            <MenuItem value=""><em>Seleccione un año</em></MenuItem>
                            {Array.from(new Array(20), (_val, index) => new Date().getFullYear() - index).map(year => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* <Grid item xs={1}>
                    <FormControl variant='standard'>
                        <Select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="asc">↑</MenuItem>
                            <MenuItem value="desc">↓</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del Socio</TableCell>
                            <TableCell align="right">Cédula</TableCell>
                            <TableCell align="right">Tipo de Cuota</TableCell>
                            <TableCell align="right">Cuota Mes</TableCell>
                            <TableCell align="right">Fecha de Pago</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cuotasPagadas.map((cuota) => (
                            <TableRow key={cuota.idCuotaSocio}>
                                <TableCell component="th" scope="row">{cuota.nombreSocio}</TableCell>
                                <TableCell align="right">{separadorMiles(cuota.cedula, true)}</TableCell>
                                <TableCell align="right">{cuota.tipoCuota}</TableCell>
                                <TableCell align="right">{cuota.cuotaMes}</TableCell>
                                <TableCell align="right">{cuota.fechaPago !== null ? formatearFechaTipoDate(cuota.fechaPago) : ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30]}
                                colSpan={3}
                                count={cuotasPagadas.length}
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

export default CuotasPagadas;
