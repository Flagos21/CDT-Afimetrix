export interface Curso {
  idCurso: number;
  idColegio: number;
  idProfesor: string;
  Nombre: string;
}
export interface Colegio {
  idColegio: number;
  Nombre: string;
  idFundacion: number;
  idCiudad: number;
  NombreCiudad: string;
  NombreFundacion: string;
}
export interface Ciudad {
  idCiudad: number;
  Nombre: string;
}
export interface Fundacion {
  idFundacion: number;
  idAsociacion: number;
  Nombre: string;
}

export interface Profesor {
  idProfesor: string;
  Nombre: string;
  Clave: string;
  idColegio: number;
  Tipo:  string
}
