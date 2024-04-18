import { Component, OnInit } from '@angular/core';
import { Curso, Colegio } from '../curso';
import { CommonModule } from '@angular/common';
import { CursoService } from '../curso.service';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-visual-curso',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visual-curso.component.html',
  styleUrl: './visual-curso.component.css'
})
export class VisualCursoComponent {
  cursos: Curso[] = [];
  colegios: Colegio[] = [];
  colegioId: number = 7;

  constructor(public cursoService: CursoService, private router: Router){}
  
  ngOnInit(): void {
    this.getAllCursos();
    this.getAllColegios();
  }

  getAllColegios(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.cursoService.getAllC().subscribe((data: Colegio[]) => {
      // Suponiendo que this.colegioId contiene la ID del colegio que quieres mostrar
      this.colegios = data.filter(colegio => colegio.idColegio === this.colegioId); 
      console.log(this.colegios);
    });
  }
  
  getAllCursos(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.cursoService.getAll().subscribe((data: Curso[]) =>{
      this.cursos = data;
      console.log(this.cursos);
    });
  }
}

