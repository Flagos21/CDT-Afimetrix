import { Component, OnInit, numberAttribute } from '@angular/core';
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
  cursoId: number = 0;

  constructor(public estudianteService: EstudianteService, private router: Router, private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params !== null && params.has('idCurso')) {
        const idCursoParam = params.get('idCurso');
        if (idCursoParam !== null) {
          this.cursoId = +idCursoParam;
        }
      }
    });
    this.getAllEstudiante();
    this.getAllCurso();
  }

  getAllCurso(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAllCs().subscribe((data: Curso[]) => {
      this.cursos = data.filter(cursos => cursos.idCurso === this.cursoId); 
      console.log(this.cursos);
    });
  }
  
  getAllEstudiante(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAll(this.cursoId).subscribe((data: Estudiante[]) => {
      this.estudiantes = data.filter(estudiante => estudiante.idCurso === this.cursoId );
      console.log(this.estudiantes);
    });
  }

  agregarEstudiante(){
    this.router.navigateByUrl('estudiantes/me-agregar-estudiante');
  }
  verEstudiante(idEstudiante: string): void {
    this.router.navigate(['/estudiantes', idEstudiante, 'me-actualizar-estudiante']);
  }
  
}
