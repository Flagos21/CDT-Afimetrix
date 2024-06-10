import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../encuesta.service';
import { Encuesta, Estudiante, Matricula, EncuestaPregunta, Pregunta, Respuesta } from '../encuesta';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-preguntas-encuesta',
  templateUrl: './preguntas-encuesta.component.html',
  styleUrls: ['./preguntas-encuesta.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PreguntasEncuestaComponent implements OnInit {
  form!: FormGroup;
  encuestas: Encuesta[] = [];
  selectedEncuesta: Encuesta | null = null;
  preguntas: Pregunta[] = [];

  constructor(
    private encuestaService: EncuestaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllDetalleEncuestas();

    this.form = this.formBuilder.group({


    })
  }
  getAllDetalleEncuestas(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.encuestaService.getAll().subscribe((data: Encuesta[]) => {
      this.encuestas = data;
    });
  }
  onEncuestaChange(event: any): void {
    const selectedEncuestaId = event.target.value;
    this.selectedEncuesta = this.encuestas.find(encuesta => encuesta.idDetalleEncuesta === +selectedEncuestaId) || null;
    if (this.selectedEncuesta) {
      this.getPreguntasByidPreguntasEncuesta(this.selectedEncuesta.idPreguntasEncuesta);
    }
  }
  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return 'Fecha no disponible';
    }
    return moment(dateString).format('DD-MM-YYYY');
  }
  getPreguntasByidPreguntasEncuesta(idPreguntasEncuesta: number): void {
    this.encuestaService.getPreguntas().subscribe((data: Pregunta[]) => {
      this.preguntas = data.filter(pregunta => pregunta.idPreguntasEncuesta === idPreguntasEncuesta);
      console.log(this.preguntas);
    });
  }
  

  }
