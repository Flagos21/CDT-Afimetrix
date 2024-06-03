import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaService } from '../encuesta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-encuesta.component.html',
  styleUrl: './crear-encuesta.component.css'
})
export class CrearEncuestaComponent {
  form: FormGroup;
  cursoIdFromURL: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private encuestaService: EncuestaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params !== null && params.has('idCurso')) {
        const idCursoParam = params.get('idCurso');
        if (idCursoParam !== null) {
          this.cursoIdFromURL = +idCursoParam;
        }
      }
    });

    this.form = this.formBuilder.group({
      Tipo: ['', Validators.required],
      Nombre: ['', Validators.required],
      FechaInicio: ['', [Validators.required, this.fechaInicioValidator()]], // Aplicar la validación personalizada
      FechaFin: ['', Validators.required],
      idCurso: [this.cursoIdFromURL, Validators.required],
    });

    this.form.get('FechaInicio')?.valueChanges.subscribe(() => {
      const fechaInicio = this.form.get('FechaInicio')?.value;
      if (fechaInicio) {
        const fechaFin = new Date(fechaInicio);
        fechaFin.setDate(fechaFin.getDate() + 20); // Añadir 20 días a la fecha de inicio
        this.form.get('FechaFin')?.setValue(fechaFin.toISOString().substring(0, 10)); // Formatear la fecha como YYYY-MM-DD
      }
    });
  }

  fechaInicioValidator() {
    return (control: any) => {
      const fecha = new Date(control.value);
      const fechaActual = new Date();
      if (fecha >= fechaActual || fecha.getTime() === fechaActual.getTime()) { 
        return null;
      } else {
        return { fechaInvalida: true };
      }
    };
  }
  

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.encuestaService.create(this.form.value).subscribe(
        (res: any) => {
          console.log('Encuesta creada con éxito!', res);
          this.router.navigateByUrl('curso/detalle-encuesta/' + this.cursoIdFromURL);
        },
        error => {
          console.error('Error al enviar la encuesta:', error);
        }
      );
    } else {
      console.error('El formulario no es válido. Verifica los campos.');
    }
  }
}