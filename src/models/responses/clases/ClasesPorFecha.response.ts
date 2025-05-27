export interface ClasesPorFechaResponse {
  status:       boolean;
  msg:          string;
  clasesDelDia: ClasesDelDia[];
}

export interface ClasesDelDia {
  idAgendamiento: number;
  idProfesor:     number;
  nombreProfesor: string;
  idCliente:      number;
  nombreCmp:      string;
  idMesa:         number;
  descMesa:       string;
  horaDesde:      Date;
  horaHasta:      Date;
  claseAgendada:  boolean;
  montoAbonado:   number;
  fechaCreacion:  Date;
}


export default ClasesPorFechaResponse;