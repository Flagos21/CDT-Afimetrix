import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteService } from '../estudiante.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-me-agregar-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './me-agregar-estudiante.component.html',
  styleUrl: './me-agregar-estudiante.component.css'
})
export class MeAgregarEstudianteComponent {

  form!: FormGroup;

  constructor(
    public estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.form = new FormGroup({
      idEstudiante: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      FechaNacimiento: new FormControl('', Validators.required),
      Sexo: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.estudianteService.create(this.form.value).subscribe((res:any) => {
      console.log('Estudiante creado con exito!');
      this.router.navigateByUrl('estudiantes/me-visual-estudiante'); //Poner Ruta
    })
  }


}
