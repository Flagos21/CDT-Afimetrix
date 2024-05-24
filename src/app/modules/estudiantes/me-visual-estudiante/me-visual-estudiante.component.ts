import { Component, OnInit } from '@angular/core';
import { Curso, Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../estudiante.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-me-visual-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './me-visual-estudiante.component.html',
  styleUrls: ['./me-visual-estudiante.component.css']
})
export class MeVisualEstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];
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
    this.getAllEstudiantes();
    this.getAllCursos();
  }

  getAllCursos(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAllCursos().subscribe((data: Curso[]) => {
      this.cursos = data.filter(curso => curso.idCurso === this.idCurso);
      console.log(this.cursos);
    });
  }

  getAllEstudiantes(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAllEstudiantes(this.idCurso).subscribe((data: Estudiante[]) => {
      this.estudiantes = data.filter(estudiante => estudiante.idCurso === this.idCurso);
      console.log(this.estudiantes);
    });
  }

  agregarEstudiante(): void {
    this.router.navigate(['estudiantes/me-agregar-estudiante', { idCurso: this.idCurso }]);
  }

  verEstudiante(idEstudiante: string): void {
    this.router.navigate(['/estudiantes', idEstudiante, 'me-actualizar-estudiante']);
  }
}
