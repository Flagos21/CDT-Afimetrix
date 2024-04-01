import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiURL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Curso[]>{
    return this.httpClient
      .get<Curso[]>(this.apiURL + '/cursos/')
      .pipe(catchError(this.errorHandler));
  }

  create(curso: Curso): Observable<Curso> {
    return this.httpClient
      .post<Curso>(
        this.apiURL + '/cursos/agregar-curso',
        JSON.stringify(curso),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id:number): Observable<Curso>{
    return this.httpClient
      .get<Curso>(this.apiURL + '/cursos/' + id)
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
