// encuesta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Encuesta, Curso, EncuestaPregunta, Estudiante, Matricula, Respuesta, Pregunta } from './encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  create(encuesta: Encuesta): Observable<Encuesta> {
    return this.httpClient
      .post<Encuesta>(
        `${this.apiURL}/detalleencuesta/crear-encuesta`,
        JSON.stringify(encuesta),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Encuesta[]> {
    return this.httpClient
      .get<Encuesta[]>(`${this.apiURL}/detalleencuesta/`)
      .pipe(catchError(this.errorHandler));
  }

  getAllCurso(): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(`${this.apiURL}/curso/`)
      .pipe(catchError(this.errorHandler));
  }

  getPreguntaEncuesta(): Observable<EncuestaPregunta[]> {
    return this.httpClient
      .get<EncuestaPregunta[]>(`${this.apiURL}/encuesta/`)
      .pipe(catchError(this.errorHandler));
  }

  getAllEstudiantes(): Observable<Estudiante[]> {
    return this.httpClient
      .get<Estudiante[]>(`${this.apiURL}/estudiante`)
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
        catchError(this.errorHandler)
      );
  }

  getAllMatricula(): Observable<Matricula[]> {
    return this.httpClient
      .get<Matricula[]>(`${this.apiURL}/matricula/`)
      .pipe(catchError(this.errorHandler));
  }

  createRespuesta(respuesta: Respuesta): Observable<Respuesta> {
    return this.httpClient
      .post<Respuesta>(
        `${this.apiURL}/crear-respuestas`,
        JSON.stringify(respuesta),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getPreguntas(): Observable<Pregunta[]> {
    return this.httpClient
      .get<Pregunta[]>(`${this.apiURL}/pregutas`)
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
