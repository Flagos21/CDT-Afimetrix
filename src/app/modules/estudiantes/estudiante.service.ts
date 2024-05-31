import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Curso, Estudiante } from './estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiURL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}


  getAllEstudiantes(idCurso: number): Observable<Estudiante[]> {
    return this.httpClient
      .get<Estudiante[]>(`${this.apiURL}/estudiante?cursoId=${idCurso}`)
      .pipe(
        map((data: any[]) => data.map(item => ({
          idEstudiante: item.idEstudiante,
          Nombre: item.Nombre,
          FechaNacimiento: item.FechaNacimiento,
          Sexo: item.Sexo,
          Clave: item.Clave,
          idMatricula: item.idMatricula,
          Anio: item.AnioMatricula,
          idCurso: item.idCurso
        }))),
        catchError(this.handleError)
      );
  }

  getAllCursos(): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(`${this.apiURL}/curso`)
      .pipe(
        map((data: any[]) => data.map(item => ({
          idCurso: item.idCurso,
          idColegio: item.idColegio,
          idProfesor: item.idProfesor,
          Nombre: item.Nombre,
        }))),
        catchError(this.handleError)
      );
  }

  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient
      .post<Estudiante>(
        `${this.apiURL}/estudiante/me-agregar-estudiante`,
        JSON.stringify(estudiante),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  find(idEstudiante: string): Observable<Estudiante> {
    return this.httpClient
      .get<Estudiante>(`${this.apiURL}/estudiante/${idEstudiante}`)
      .pipe(catchError(this.handleError));
  }

  update(idEstudiante: string, estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient
      .put<Estudiante>(
        this.apiURL + '/estudiante/' + idEstudiante,
        JSON.stringify(estudiante),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteEstudiante(idEstudiante: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.apiURL}/estudiante/${idEstudiante}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
