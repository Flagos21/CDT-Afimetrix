
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoService } from '../curso.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Colegio, Profesor } from '../curso';

@Component({
  selector: 'app-agregar-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.css'
})
export class AgregarCursoComponent {

  form! : FormGroup;
  profesores: any[] = [];
  colegios: any[] = []
  colegioIdFromUrl: number = 0;
  idCurso: number = 0;

  constructor(
    public cursoService: CursoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){}
  
  setCursoId(cursoId: number) {
    this.idCurso = cursoId;
  }

  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      if (params !== null && params.has('idColegio')) {
        const idColegioParam = params.get('idColegio');
        if (idColegioParam !== null) {
          this.colegioIdFromUrl = +idColegioParam;
        }
      }
    });
    this.form = this.formBuilder.group({
      idCurso: ['', [Validators.required]],
      idColegio: [this.colegioIdFromUrl, Validators.required],
      idProfesor: ['', Validators.required],
      Nombre: ['', Validators.required],
    });

    this.cursoService.getAllP().subscribe((data : Profesor[])=>
    this.profesores = data);
    this.cursoService.getAllC().subscribe((data : Colegio[])=>
    this.colegios = data)
  }

  get f() {
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.cursoService.create(this.form.value).subscribe((res:any) => {
      console.log('Curso creado con exito!');
      this.router.navigateByUrl('curso/visual-curso');
    })
  }


}
