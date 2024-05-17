export interface Encuesta {
    idDetalleEncuesta: number,
    Tipo: string,
    FechaInicio: string,
    FechaFin: string,
    idEncuesta: number,
    idCurso: number;
}
export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}