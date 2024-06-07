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
export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}