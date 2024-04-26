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
  NombreCiudad: string; // Nuevo campo para el nombre de la ciudad
  NombreFundacion: string; // Nuevo campo para el nombre de la fundación
}


export interface Profesor {
  idProfesor: number;
  Nombre: string;
  Clave: string;
  Tipo: string;
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
