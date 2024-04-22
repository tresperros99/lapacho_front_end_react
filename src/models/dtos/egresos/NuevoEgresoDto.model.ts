export interface NuevoEgresoDto {
    idTipoEgreso:      number;
    descripcionEgreso: string;
    montoEngreso:      number;
    idSocio:           number;
    nroFactura:        string;
    fechaPago:         string;
}

export default NuevoEgresoDto;