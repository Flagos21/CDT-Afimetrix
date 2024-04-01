import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Estudiante } from './estudiante';

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

  // Obtener todos los registros de estudiante

  getAll(): Observable<Estudiante[]> {
    return this.httpClient
      .get<Estudiante[]>(this.apiURL + '/estudiantes/')
      .pipe(catchError(this.errorHandler));
  }

  //Crear un estudiante

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient
      .post<Estudiante>(
        this.apiURL + '/estudiantes/me-agregar-estudiante',
        JSON.stringify(estudiante),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Buscar un estudiante especifico

  find(id: number): Observable<Estudiante> {
    return this.httpClient
      .get<Estudiante>(this.apiURL + '/estudiantes/' + id)
      .pipe(catchError(this.errorHandler));
  }

  //Actualizar datos de un  estudiante especifico

  update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient
      .put<Estudiante>(
        this.apiURL + '/estudiantes/' + id,
        JSON.stringify(estudiante),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Eliminar un estudiante especifico

  delete(id: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.apiURL + '/estudiantes/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Manejar errores

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
