import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../estudiante';
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

  constructor(public estudianteService: EstudianteService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.estudianteService.getAll().subscribe((data: Estudiante[]) => {
      this.estudiantes = data;
      console.log(this.estudiantes);
    });
  }

  deleteEstudiante(idEstudiante: string) {
    this.estudianteService.delete(idEstudiante).subscribe((res: any) => {
      this.estudiantes = this.estudiantes.filter((item) => item.idEstudiante !== idEstudiante);
      console.log('Estudiante eliminado exitosamente');
    });
  }

  agregarEstudiante(){
    this.router.navigateByUrl('estudiantes/me-agregar-estudiante');
  }
  editarEstudiante(){
    this.router.navigateByUrl('estudiantes/me-actualizar-estudiante');
  }
}
