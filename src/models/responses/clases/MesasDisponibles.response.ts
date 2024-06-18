export interface MesasDisponiblesResponse {
    status:           boolean;
    msg:              string;
    mesasDisponibles: MesasDisponible[];
}

export interface MesasDisponible {
    idMesa:   number;
    descMesa: string;
}
