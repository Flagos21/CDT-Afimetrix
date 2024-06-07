import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../estudiante.service';
import { Curso, Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-me-actualizar-estudiante',
    standalone: true,
    templateUrl: './me-actualizar-estudiante.component.html',
    styleUrls: ['./me-actualizar-estudiante.component.css'],
    imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class MeActualizarEstudianteComponent implements OnInit {
  idEstudiante!: string;
  estudiante!: Estudiante;
  cursos: Curso[] = [];
  form!: FormGroup;
  idCurso: number = 0;

  constructor(
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
        idMatricula: new FormControl('', Validators.required),
        Anio: new FormControl('2024', Validators.required),
        idCurso: new FormControl('', Validators.required)
    });

    this.idEstudiante = this.activatedRoute.snapshot.params['estudianteId'];
    this.estudianteService.find(this.idEstudiante).subscribe((data: Estudiante) => {
        this.estudiante = data;
        console.log('Datos del estudiante:', this.estudiante);
        console.log('idCurso del estudiante:', this.estudiante.idCurso); // Agregamos esta línea para depurar
        this.form.patchValue({
            idEstudiante: this.estudiante.idEstudiante,
            Nombre: this.estudiante.Nombre,
            FechaNacimiento: this.estudiante.FechaNacimiento,
            Sexo: this.estudiante.Sexo,
            Clave: this.estudiante.Clave,
            idMatricula: this.estudiante.idMatricula,
            AnioMatricula: this.estudiante.Anio,
            idCurso: this.estudiante.idCurso
        });
    });
}


  get f() {
    return this.form.controls;
  }
  submit() {
    if (this.form.valid) {
      this.estudianteService.update(this.idEstudiante, this.form.value).subscribe(() => {
        console.log('Estudiante actualizado con éxito!');
        // Obtener el valor actualizado de idCurso antes de redirigir
        const idCurso = this.form.get('idCurso')?.value;
        this.router.navigateByUrl(`estudiantes/me-visual-estudiante/${idCurso}`); 
      });
    }
  }
  
}
