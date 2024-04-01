import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Colegio } from './colegio';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {
  private apiURL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient){}

  // Obtener todos los registros de estudiante

  getAll(): Observable<Colegio[]> {
    return this.httpClient
      .get<Colegio[]>(`${this.apiURL}/colegios`)
      .pipe(catchError(this.errorHandler));
  }

  //Crear un estudiante

  create(colegio: Colegio): Observable<Colegio> {
    return this.httpClient
      .post<Colegio>(
        `${this.apiURL}/colegios/agregar-colegios`,
        JSON.stringify(colegio),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Buscar un estudiante especifico

  find(id: number): Observable<Colegio> {
    return this.httpClient
      .get<Colegio>(this.apiURL + '/colegios/' + id)
      .pipe(catchError(this.errorHandler));
  }

  //Actualizar datos de un  estudiante especifico

  update(id: number, colegio: Colegio): Observable<Colegio> {
    return this.httpClient
      .put<Colegio>(
        this.apiURL + '/colegios/' + id,
        JSON.stringify(colegio),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Eliminar un estudiante especifico

  delete(id: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.apiURL + '/colegios/' + id, this.httpOptions)
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
