export interface GenerarComprasClubDto {
    compras: Compra[];
}

export interface Compra {
    descripcion:      string;
    cantidad:         number;
    gastoFijo:        boolean;
    tipoEgreso:       number;
    fechaVencimiento: Date | null;
}

export default GenerarComprasClubDto;