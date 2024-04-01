import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Profesor } from './profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiURL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Profesor[]>{
    return this.httpClient
    .get<Profesor[]>(this.apiURL + '/profesores/')
    .pipe(catchError(this.errorHandler));
  }

  create(profesor: Profesor): Observable<Profesor> {
    return this.httpClient
      .post<Profesor>(
        this.apiURL + '/profesores/mp-agregar-profesor',
        JSON.stringify(profesor),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  find(id: number): Observable<Profesor> {
    return this.httpClient
      .get<Profesor>(this.apiURL + '/profesores/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, profesor: Profesor): Observable<Profesor> {
    return this.httpClient
      .put<Profesor>(
        this.apiURL + '/profesores/' + id,
        JSON.stringify(profesor),
        this.httpOptions
      )
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
