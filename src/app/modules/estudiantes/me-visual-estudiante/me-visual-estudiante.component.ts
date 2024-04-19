import { Component, OnInit } from '@angular/core';
import { Curso, Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../estudiante.service';
import { RouterModule, Router } from '@angular/router';

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
  cursoId: number = 1;

  constructor(public estudianteService: EstudianteService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEstudiante();
    this.getAllCurso();
  }

  getAllCurso(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAllCs().subscribe((data: Curso[]) => {
      // Suponiendo que this.colegioId contiene la ID del colegio que quieres mostrar
      this.cursos = data.filter(cursos => cursos.idCurso === this.cursoId); 
      console.log(this.cursos);
    });
  }
  
  getAllEstudiante(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAll().subscribe((data: Estudiante[]) => {
      this.estudiantes = data;
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
