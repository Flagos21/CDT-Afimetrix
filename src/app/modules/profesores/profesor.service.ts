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
  getAllC(idColegio: number): Observable<Colegio[]> {
    return this.httpClient
      .get<any>(this.apiURL + '/colegio/' + idColegio)
      .pipe(
        map((data: any) => {
          const colegio: Colegio = {
            idColegio: idColegio,
            Nombre: data.NombreColegio,
            NombreCiudad: data.NombreCiudad,
            NombreFundacion: data.NombreFundacion,
            idFundacion: data.idFundacion, // Asegúrate de incluir estos campos si son necesarios
            idCiudad: data.idCiudad // Asegúrate de incluir estos campos si son necesarios
          };
          return [colegio]; // Devuelve un array con un solo objeto Colegio
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
