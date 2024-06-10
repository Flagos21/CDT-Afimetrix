export interface Encuesta {
    idDetalleEncuesta: number,
    Tipo: string,
    Nombre: string,
    FechaInicio: string,
    FechaFin: string,
    idCurso: number;
    idPreguntasEncuesta: number;
}
export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}
export interface EncuestaPregunta {
    idPreguntasEncuesta: number;
    Nombre: string;
}
export interface Pregunta {

    idPregunta: number;
    Nombre: string;
    Tipo: string;
    idPreguntasEncuesta: number;
}
export interface Respuesta {
    idRespuesta: number;
    idEstudiante: string;
    Respuesta: string;
    Fecha: string;
    idPregunta: number;
}
export interface Estudiante {
    idEstudiante: string;
    Nombre: string;
    FechaNacimiento: string;
    Sexo: string;
    Clave: string;
    idMatricula?: any;
    Anio: number;
    idCurso: number;
    [key: string]: any;
}
export interface Matricula {
    idMatricula: number;
    Anio: number;
    idEstudiante: number;
    idCurso: number;
}