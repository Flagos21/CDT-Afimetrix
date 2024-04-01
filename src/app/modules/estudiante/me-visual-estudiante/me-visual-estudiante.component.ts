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

  deleteEstudiante(id: number) {
    this.estudianteService.delete(id).subscribe((res: any) => {
      this.estudiantes = this.estudiantes.filter((item) => item.id !== id);
      console.log('Estudiante eliminado exitosamente');
    });
  }

  agregarEstudiante(){
    this.router.navigateByUrl('estudiante/me-agregar-estudiante');
  }
  editarEstudiante(){
    this.router.navigateByUrl('estudiante/me-actualizar-estudiante');
  }
}
