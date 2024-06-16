import { Alert, Button, Checkbox, Grid, Snackbar, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCuotasPendientesSocio, postPagoCuotasSociosVarias } from "../../../api/ApiCuotas";
import BuscadorSocios from "../../../components/genericos/BuscadorSocios";
import { ContainerComponent } from "../../../components/genericos/ContainerComponent";
import YearSelector from "../../../components/genericos/YearSelector";
import PagoCuotasModal from "../../../components/socios/PagoCuotasModal";
import { separadorMiles } from "../../../helpers/Numbers";
import { formatearFechaTipoDate } from "../../../helpers/fechas";
import PagoCuotaSociosVariasDto, { Cuota } from "../../../models/dtos/socios/cuotas/PagoCuotasSocioVariasDto.model";
import { CuotaPagada } from "../../../models/responses/cuotas/ListadoCuotasPendientesSocio.response";
import { SociosFormateado } from "../../../models/responses/socios/SociosPorCedula.response";

const PagoDeCuotas = () => {
    const [selectdSocio, setSelectedSocio] = useState<SociosFormateado | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [cuotasSocio, setCuotasSocio] = useState<CuotaPagada[]>([]);
    const [selectedCuotas, setSelectedCuotas] = useState<Cuota[]>([]);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleSelectSocio = (socio: SociosFormateado | null) => {
        setSelectedSocio(socio);
        setSelectedCuotas([]);
    };

    const handleYearSelect = (year: number | null) => {
        setSelectedYear(year);
    };

    const getCuotasSocio = async (numeroCedula: string, annio: string) => {
        const cuotasSocio = await getCuotasPendientesSocio(numeroCedula, annio);
        if (cuotasSocio) {
            const sortedCuotas = cuotasSocio.cuotasPagadas.sort((a, b) => {
                if (a.nombreSocio < b.nombreSocio) {
                    return -1;
                }
                if (a.nombreSocio > b.nombreSocio) {
                    return 1;
                }
                return Number(a.numeroMes) - Number(b.numeroMes);
            });
            setCuotasSocio(sortedCuotas);
        }
    };

    const handleCheckboxChange = (socio: CuotaPagada) => {
        if (socio.fechaPago) {
            return; // Do not allow selection of paid cuotas
        }

        const selected = selectedCuotas.some(cuota => cuota.idCuotaSocio === socio.idCuotaSocio);
        if (selected) {
            setSelectedCuotas(selectedCuotas.filter(cuota => cuota.idCuotaSocio !== socio.idCuotaSocio));
        } else {
            if (selectedCuotas.length > 0 && selectedCuotas[0].idSocio !== socio.idSocio) {
                setAlertOpen(true);
                return;
            }
            setSelectedCuotas([...selectedCuotas, {
                idSocio: socio.idSocio,
                idCuotaSocio: socio.idCuotaSocio,
                numeroCedula: socio.cedula,
            }]);
        }
    };

    const handlePagar = async (nroFactura?: string, descripcionPago?: string) => {
        const updatedCuotas = selectedCuotas.map(cuota => ({
            ...cuota,
            nroFactura,
            descripcionPago
        }));
        const payload: PagoCuotaSociosVariasDto = { cuotas: updatedCuotas };
        const pagoCuotaResp = await postPagoCuotasSociosVarias(payload)
        if (pagoCuotaResp) {
            setSuccessAlertOpen(true);
            if (selectdSocio && selectedYear) {
                setSelectedCuotas([]);
                await getCuotasSocio(selectdSocio.cedula, selectedYear.toString());

            }
        }
        setModalOpen(false);
    };

    useEffect(() => {
        if (selectdSocio && selectedYear) {
            getCuotasSocio(selectdSocio.cedula, selectedYear.toString());
        }
    }, [selectdSocio, selectedYear]);

    return (
        <ContainerComponent>
            <Typography textAlign={'center'} variant='h4' marginBottom={2}>Pago de Cuotas</Typography>
            <Grid container>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                        <BuscadorSocios onSelect={handleSelectSocio} />
                    </Grid>
                    <Grid item xs={6}>
                        <YearSelector onYearSelect={handleYearSelect} />
                    </Grid>
                </Grid>

                {cuotasSocio.length > 0 ?
                    <Grid item xs={12}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Socio</TableCell>
                                    <TableCell align="right">Cedula</TableCell>
                                    <TableCell align="right">Mes</TableCell>
                                    <TableCell align="right">Fecha de vencimiento</TableCell>
                                    <TableCell align="right">Fecha de Pago</TableCell>
                                    <TableCell align="right">Monto</TableCell>
                                    <TableCell align="right">Pagar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cuotasSocio.map((socio) => (
                                        <TableRow
                                            key={socio.idCuotaSocio}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {socio.nombreSocio}
                                            </TableCell>
                                            <TableCell align="right">{separadorMiles(socio.cedula, true)}</TableCell>
                                            <TableCell align="right">{socio.cuotaMes}</TableCell>
                                            <TableCell align="right">{formatearFechaTipoDate(socio.fechaVencimiento)}</TableCell>
                                            <TableCell align="right">{socio.fechaPago ? formatearFechaTipoDate(socio.fechaPago) : 'PENDIENTE'}</TableCell>
                                            <TableCell align="right">{separadorMiles(socio.monto, true)}</TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    checked={selectedCuotas.some(cuota => cuota.idCuotaSocio === socio.idCuotaSocio)}
                                                    onChange={() => handleCheckboxChange(socio)}
                                                    disabled={!!socio.fechaPago} // Disable checkbox if cuota is already paid
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                {/* <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={nominaSocios.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                            </TableFooter>
                        </Table>
                        <Grid container item xs={12} justifyContent={'flex-end'} mt={2}>
                            <Button variant="contained" onClick={() => setModalOpen(true)}>
                                Pagar
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid item xs={12} justifyContent={'center'} mt={8}>
                        <Typography textAlign={'center'} color={'gray'}>
                            Busque el Socio para ver sus cuotas Pendientes
                        </Typography>
                    </Grid>
                }
            </Grid>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity="warning">
                    Solo se pueden seleccionar cuotas del mismo socio.
                </Alert>
            </Snackbar>
            <Snackbar open={successAlertOpen} autoHideDuration={6000} onClose={() => setSuccessAlertOpen(false)}>
                <Alert onClose={() => setSuccessAlertOpen(false)} severity="success">
                    Cuota pagada correctamente.
                </Alert>
            </Snackbar>
            <PagoCuotasModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handlePagar={handlePagar}
            />
        </ContainerComponent>
    );
};

export default PagoDeCuotas;
