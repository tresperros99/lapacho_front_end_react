import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getCuotasPendientesSocio, getGrillaCuotasExcel, postPagarCuotaPendienteSocio } from '../../../api/ApiCuotas';
import { ContainerComponent } from '../../../components/genericos/ContainerComponent';
import { separadorMiles } from '../../../helpers/Numbers';
import { capitalizePorPalabra } from '../../../helpers/capitalize';
import { formatearFechaTipoDate, getFormattedDate } from '../../../helpers/fechas';
import { Cuota } from '../../../models/responses/cuotas/ListadoCuotasPendientesSocio.response';

const CuotasPendientes = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [cuotasPendientes, setCuotasPendientes] = useState<Cuota[]>([]);
    const [numeroDocumento, setNumeroDocumento] = useState<string>('');
    const [anio, setAnio] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const fetchData = async () => {
        try {
            const response = await getCuotasPendientesSocio(numeroDocumento, anio);
            if (response) {
                if (response.status) {
                    const cuotasPendientes = response.cuotas.filter(cuota => cuota.fechaPago === null);
                    const sortedData = sortData(cuotasPendientes);
                    setCuotasPendientes(sortedData);
                } else {
                    setCuotasPendientes([]);
                }
            } else {
                console.error('Error al obtener las cuotas pendientes:');
            }
        } catch (error) {
            console.error('Error al obtener las cuotas pendientes:', error);
        }
    };

    const sortData = (data: Cuota[]) => {
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

    const handlePagoCuota = async (pagarCuotaPendienteSocioDto: any) => {
        const pagarCuotaPendienteSocio = await postPagarCuotaPendienteSocio(pagarCuotaPendienteSocioDto);
        if (pagarCuotaPendienteSocio) {
            fetchData();
        }
    };

    const handleDescargarPdf = async () => {

        const getPDF = await getGrillaCuotasExcel();
        if (getPDF) {
            const fechaHoy = getFormattedDate();
            const fileURL = URL.createObjectURL(new Blob([getPDF]));
            const link = document.createElement("a");
            link.href = fileURL;
            link.setAttribute("download", `reporte_${fechaHoy}.xls`);
            document.body.appendChild(link);
            link.click();
        }
    }


    return (
        <ContainerComponent>
            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Panel de Cuotas Pendientes</Typography>

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
                <Grid item xs={5}>
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
                <Grid item xs={1}>
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
                </Grid>
                <Grid container item xs={12} justifyContent={`flex-end`}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDescargarPdf}
                    >
                        Descargar Grilla Excel
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del Socio</TableCell>
                            <TableCell align="right">Cédula</TableCell>
                            <TableCell align="right">Mes</TableCell>
                            <TableCell align="right">Tipo de Cuota</TableCell>
                            <TableCell align="right">Monto</TableCell>
                            <TableCell align="right">Fecha Vencimiento</TableCell>
                            <TableCell align="right">Pagar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cuotasPendientes.map((cuota) => (
                            <TableRow key={cuota.idCuotaSocio}>
                                <TableCell component="th" scope="row">{cuota.nombresocio}</TableCell>
                                <TableCell align="right">{cuota.cedula}</TableCell>
                                <TableCell align="right">{capitalizePorPalabra(cuota.cuotaMes)}</TableCell>
                                <TableCell align="right">{cuota.fechaVencimiento.toLocaleDateString()}</TableCell>
                                <TableCell align="right">{separadorMiles(cuota.montoCuota, true)} Gs.</TableCell>
                                <TableCell align="right">{formatearFechaTipoDate(cuota.fechaVencimiento)}</TableCell>
                                <TableCell align="right">
                                    <Button color="primary" variant="contained" onClick={() => handlePagoCuota({ idCuotaSocio: Number(cuota.idCuotaSocio), idSocio: cuota.idsocio, descripcionPago: `cuota pagada ${cuota.cuotaMes}`, montoAbonado: cuota.montoCuota, numeroCedula: cuota.cedula, nroFactura: 'XXXXX' })}>
                                        Pagar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30]}
                                colSpan={3}
                                count={cuotasPendientes.length}
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

export default CuotasPendientes;
