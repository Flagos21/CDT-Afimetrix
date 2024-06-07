import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Encuesta, Curso, EncuestaPregunta } from './encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private apiURL = 'http://localhost:3000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }
  create(encuesta: Encuesta): Observable<Encuesta> {
    return this.httpClient
      .post<Encuesta>(
        this.apiURL + '/detalleencuesta/crear-encuesta',
        JSON.stringify(encuesta),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Encuesta[]> {
    return this.httpClient
      .get<Encuesta[]>(this.apiURL + '/detalleencuesta/')
      .pipe(catchError(this.errorHandler));
  }
  getEncuestaByCurso(idCurso: number): Observable<Encuesta[]> {
    return this.httpClient
      .get<Encuesta[]>(`${this.apiURL}/curso/${idCurso}/encuesta`)
      .pipe(catchError(this.errorHandler));
  }
  getAllCurso(): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(this.apiURL + '/curso/')
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
  getPreguntaEncuesta(): Observable<EncuestaPregunta[]> {
    return this.httpClient
      .get<EncuestaPregunta[]>(this.apiURL + '/encuesta/')
      .pipe(catchError(this.errorHandler));
  }
}