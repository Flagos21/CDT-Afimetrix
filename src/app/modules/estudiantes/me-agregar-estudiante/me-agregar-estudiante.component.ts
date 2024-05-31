import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Estudiante, Curso } from '../estudiante';


@Component({
  selector: 'app-me-agregar-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './me-agregar-estudiante.component.html',
  styleUrls: ['./me-agregar-estudiante.component.css']
})
export class MeAgregarEstudianteComponent implements OnInit {

  form!: FormGroup;
  cursos: Curso[] = [];
  idCurso: number = 0;

  constructor(
    public estudianteService: EstudianteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params !== null && params.has('idCurso')) {
        const idCursoParam = params.get('idCurso');
        if (idCursoParam !== null) {
          this.idCurso = +idCursoParam;
        }
      }
    });

    this.estudianteService.getAllCursos().subscribe((data: Curso[]) => {
      this.cursos = data;
    });

    this.form = new FormGroup({
      idEstudiante: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      FechaNacimiento: new FormControl('', Validators.required),
      Sexo: new FormControl('', Validators.required),
      Clave: new FormControl('', Validators.required),
      Anio: new FormControl('2024', Validators.required),
      idCurso: new FormControl(this.idCurso, Validators.required),
      idMatricula: new FormControl('', Validators.required) 
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.estudianteService.createEstudiante(this.form.value).subscribe((res: any) => {
      console.log('Estudiante creado con éxito!');
      this.router.navigateByUrl('estudiantes/me-visual-estudiante/' + this.idCurso); // Ajustar la ruta según tu estructura
    });
  }
}
