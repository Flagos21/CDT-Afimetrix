import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Estudiante } from '../estudiante';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EstudianteService } from '../estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-me-actualizar-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './me-actualizar-estudiante.component.html',
  styleUrl: './me-actualizar-estudiante.component.css',
})
export class MeActualizarEstudianteComponent {
  id!: number;
  estudiante!: Estudiante;
  form!: FormGroup;

  constructor(
    public estudianteService: EstudianteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['estudianteId'];
    this.estudianteService.find(this.id).subscribe((data: Estudiante) => {
      this.estudiante = data;
    });

    this.form = new FormGroup({
      IdEstudiante: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      FechaNacimiento: new FormControl('', Validators.required),
      Sexo: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.estudianteService
      .update(this.id, this.form.value)
      .subscribe((res: any) => {
        console.log('Estudiante updated successfully!');
        this.router.navigateByUrl('estudiante/me-visual-estudiante');
      });
  }
}
