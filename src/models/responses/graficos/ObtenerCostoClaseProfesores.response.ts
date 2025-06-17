export interface ObtenerCostoClaseProfesoresResponse {
    status:      boolean;
    msg:         string;
    costosClase: CostosClase[];
}

export interface CostosClase {
    profesor: string;
    costo:    number;
}

export default ObtenerCostoClaseProfesoresResponse;
