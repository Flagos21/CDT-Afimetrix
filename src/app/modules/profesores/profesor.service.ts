import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Profesor, Colegio, Ciudad, Fundacion } from './profesor';

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

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Profesor[]> {
    return this.httpClient
      .get<Profesor[]>(this.apiURL + '/profesor/')
      .pipe(catchError(this.errorHandler));
  }

  create(profesor: Profesor): Observable<Profesor> {
    return this.httpClient
      .post<Profesor>(
        this.apiURL + '/profesor/mp-agregar-profesor',
        JSON.stringify(profesor),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  find(idProfesor: string): Observable<Profesor> {
    return this.httpClient
      .get<Profesor>(this.apiURL + '/profesor/' + idProfesor)
      .pipe(catchError(this.errorHandler));
  }

  update(idProfesor: string, profesor: Profesor): Observable<Profesor> {
    return this.httpClient
      .put<Profesor>(
        this.apiURL + '/profesor/' + idProfesor,
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

  // Colegios

  // Ciudad
  getAllCi(): Observable<Ciudad[]> {
    return this.httpClient
      .get<Ciudad[]>(this.apiURL + '/ciudad/')
      .pipe(catchError(this.errorHandler));
  }
  getAllC(): Observable<Colegio[]> {
    return this.httpClient
      .get<Colegio[]>(this.apiURL + '/colegio/')
      .pipe(
        map((data: any[]) => {
          return data.map((item: any) => {
            return {
              idColegio: item.idColegio,
              Nombre: item.Nombre,
              // Asegúrate de que la API devuelva estos campos
              NombreCiudad: item.NombreCiudad,
              NombreFundacion: item.NombreFundacion,
            } as Colegio; // Convertimos cada objeto a tipo Colegio
          });
        }),
        catchError(this.errorHandler)
      );
  }
  
  getAllF(): Observable<Fundacion[]> {
    return this.httpClient
      .get<Fundacion[]>(this.apiURL + '/fundacion/')
      .pipe(catchError(this.errorHandler));
  }
}
