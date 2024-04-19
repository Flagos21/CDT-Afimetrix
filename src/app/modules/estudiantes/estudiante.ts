export interface Estudiante {
    idEstudiante: string;
    Nombre: string;
    FechaNacimiento: string;
    Sexo: string;
    Clave: string;
}
export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}