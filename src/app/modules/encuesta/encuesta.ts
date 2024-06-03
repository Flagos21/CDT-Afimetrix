export interface Encuesta {
    idDetalleEncuesta: number,
    Tipo: string,
    Nombre: string,
    FechaInicio: string,
    FechaFin: string,
    idCurso: number;
}
export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}