import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfesorService } from '../profesor.service';

@Component({
  selector: 'app-mp-agregar-profesor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mp-agregar-profesor.component.html',
  styleUrl: './mp-agregar-profesor.component.css'
})
export class MpAgregarProfesorComponent {

  form!: FormGroup;

  constructor(
    public profesorService: ProfesorService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.form = new FormGroup({
      idProfesor: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      Clave: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.profesorService.create(this.form.value).subscribe((res:any) => {
      console.log('Profesor creado con exito!');
      this.router.navigateByUrl(''); //Poner Ruta
    })
  }
}
