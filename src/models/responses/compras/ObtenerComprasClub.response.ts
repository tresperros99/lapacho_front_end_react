export interface ObtenerComprasClubResponse {
    status:   boolean;
    msg:      string;
    cantidad: number;
    compras:  Compra[];
}
export interface Compra {
    idCompra:        number;
    fechaGeneracion: Date | null;
    estado:          EstadoPago;
    descripcion:     string;
    cantidad:        number;
    fechaCreacion:   Date;
    tipoCompra:      number | null;
    idInsumo:        number | null;
}

export enum EstadoPago {
    PendienteDePago = "PENDIENTE DE PAGO",
    Pagado = "PAGADO",
}
