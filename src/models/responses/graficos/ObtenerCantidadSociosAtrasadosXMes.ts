export interface ObtenerCantidadSociosAtrasadosXMes {
    status:             boolean;
    msg:                string;
    sociosAlDiaDetalle: SociosAlDiaDetalle[];
}

export interface SociosAlDiaDetalle {
    mes:               string;
    cantidadAtrasados: number;
}
export default ObtenerCantidadSociosAtrasadosXMes;