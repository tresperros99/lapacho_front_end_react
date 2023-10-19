export interface NominaProfesoresResponse {
    status:               boolean;
    msg:                  string;
    cantidadRegistros:    number;
    profesoresFormateado: ProfesoresFormateado[];
}

export interface ProfesoresFormateado {
    cedula:           string;
    contactoProfesor: string;
    costoXHora:       number;
    creadoEn:         Date;
    editadoEn:        null;
    estadoProfesor:   string;
    idProfesor:       number;
    nombreProfesor:   string;
}

export default NominaProfesoresResponse;