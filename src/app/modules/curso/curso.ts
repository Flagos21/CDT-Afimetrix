export interface Curso {
    idCurso: number;
    idColegio: number;
    idProfesor: string;
    Nombre: string;
}

export interface Colegio {
    idColegio: number;
    Nombre: string;
    idFundacion: string;
    idCiudad: string;
}

export interface Profesor {
    idProfesor: number;
    Nombre: string;
    Clave: string;
    Tipo: string;
}
