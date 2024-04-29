import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Colegio, Curso, Profesor, Ciudad } from './curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(this.apiURL + '/curso/')
      .pipe(catchError(this.errorHandler));
  }

  getAllP(): Observable<Profesor[]>{
    return this.httpClient
      .get<Profesor[]>(this.apiURL + '/profesor/')
      .pipe(catchError(this.errorHandler));
  }
  getAllC(): Observable<Colegio[]>{
    return this.httpClient
      .get<Colegio[]>(this.apiURL + '/colegio/')
      .pipe(catchError(this.errorHandler));
  }


  

  create(curso: Curso): Observable<Curso> {
    return this.httpClient
      .post<Curso>(
        this.apiURL + '/curso/agregar-curso',
        JSON.stringify(curso),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(idCurso:number): Observable<Curso>{
    return this.httpClient
      .get<Curso>(this.apiURL + '/curso/' + idCurso)
      .pipe(catchError(this.errorHandler));
  }

  getCursosByColegioId(idColegio: number): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(`${this.apiURL}/colegio/${idColegio}/cursos`)
      .pipe(catchError(this.errorHandler));
  }
  

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