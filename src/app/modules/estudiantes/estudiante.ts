export interface Estudiante {
    idEstudiante: string;
    Nombre: string;
    FechaNacimiento: string;
    Sexo: string;
    Clave: string;
    [key: string]: any;
}
export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}

export interface Matricula {
    idMatricula: number;
    Anio: Date;
    idEstudiante: number;
    idCurso: number;
}