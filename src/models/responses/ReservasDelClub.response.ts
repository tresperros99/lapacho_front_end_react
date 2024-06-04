export interface ReservasDelClubResponse {
    reservas:     boolean;
    msg:          string;
    reservasClub: ReservasClub[];
}

export interface ReservasClub {
    idSocioReserva: number;
    nombreCmp:      string;
    fechaReserva:   Date;
    fechaCreacion:  Date;
    horaDesde:      Date;
    horaHasta:      Date;
    descMesa:       string;
    idMesa:         number;
}

export default ReservasDelClubResponse;