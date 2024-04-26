import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfesorService } from '../profesor.service';
import { Colegio } from '../profesor';

@Component({
  selector: 'app-mp-agregar-profesor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mp-agregar-profesor.component.html',
  styleUrl: './mp-agregar-profesor.component.css'
})
export class MpAgregarProfesorComponent {

  form!: FormGroup;
  colegios:any[] = [];

  constructor(
    public profesorService: ProfesorService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.form = new FormGroup({
      idProfesor: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      Clave: new FormControl('', Validators.required),
      idColegio: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required),
    });

    // Cargar la lista de Colegios desde el servicio de colegios
    this.profesorService.getAllC().subscribe((data: Colegio[]) => {
      this.colegios = data;
  });
  }

  

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.profesorService.create(this.form.value).subscribe(
      (res: any) => {
        console.log('Profesor creado con éxito!');
        this.router.navigateByUrl('/profesor/mp-visual-profesor'); // Poner Ruta
      },
      (error: any) => {
        console.error('Error al crear el profesor:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }
}
