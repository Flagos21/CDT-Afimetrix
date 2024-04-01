import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoService } from '../curso.service';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.css'
})
export class AgregarCursoComponent {

  form! : FormGroup;

  constructor(
    public cursoService: CursoService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.form = new FormGroup({
      IdCurso: new FormControl('', [Validators.required]),
      IdColegio: new FormControl('', [Validators.required]),
      IdProfesor: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.cursoService.create(this.form.value).subscribe((res:any) => {
      console.log('Curso creado con exito!');
      this.router.navigateByUrl('');
    })
  }


}


