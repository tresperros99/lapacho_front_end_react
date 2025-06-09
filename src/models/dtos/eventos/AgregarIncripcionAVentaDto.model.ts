export interface AgregarInscipcionAVentaDto {
    inscripciones: InscripcionAVenta[];
}

export interface InscripcionAVenta {
    idSocioCuota:  null;
    idReserva:     null;
    idInscripcion: number;
    monto:         number;
    estado:        boolean;
}

export default AgregarInscipcionAVentaDto;