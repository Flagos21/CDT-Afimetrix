import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Colegio, Fundacion } from './colegio';
import { Ciudad }from './colegio';

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
      .get<Colegio[]>(`${this.apiURL}/colegio`)
      .pipe(catchError(this.errorHandler));
  }
  

  //Crear un estudiante

  create(colegio: Colegio): Observable<Colegio> {
    return this.httpClient
      .post<Colegio>(
        `${this.apiURL}/colegio/agregar-colegio`,
        JSON.stringify(colegio),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Buscar un estudiante especifico

  find(idColegio: number): Observable<Colegio> {
    return this.httpClient
      .get<Colegio>(this.apiURL + '/colegio/' + idColegio)
      .pipe(catchError(this.errorHandler));
  }

  //Actualizar datos de un  estudiante especifico

  update(idColegio: number, colegio: Colegio): Observable<Colegio> {
    return this.httpClient
      .put<Colegio>(
        this.apiURL + '/colegio/' + idColegio,
        JSON.stringify(colegio),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Eliminar un estudiante especifico

  delete(idColegio: number): Observable<any> {
    return this.httpClient
      .delete<any>(this.apiURL + '/colegio/' + idColegio, this.httpOptions)
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

  //ver ciudades asi a lo maldito 
  getAllC(): Observable<Ciudad[]> {
    return this.httpClient
      .get<Ciudad[]>(`${this.apiURL}/ciudad`)
      .pipe(catchError(this.errorHandler));
  }
  getAllF(): Observable<Fundacion[]> {
    return this.httpClient
      .get<Fundacion[]>(`${this.apiURL}/fundacion`)
      .pipe(catchError(this.errorHandler));
  }

  
}

  