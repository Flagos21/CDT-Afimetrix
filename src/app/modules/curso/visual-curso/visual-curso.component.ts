import { Component, OnInit } from '@angular/core';
import { Curso, Colegio, Ciudad, Fundacion } from '../curso';
import { CommonModule } from '@angular/common';
import { CursoService } from '../curso.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-visual-curso',
    standalone: true,
    templateUrl: './visual-curso.component.html',
    styleUrl: './visual-curso.component.css',
    imports: [CommonModule, RouterModule, ReactiveFormsModule, SidebarComponent]
})
export class VisualCursoComponent implements OnInit {
  cursos: Curso[] = [];
  colegioId: number = 0;
  colegios: Colegio[] = [];

  constructor(
    public cursoService: CursoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params !== null && params.has('idColegio')) {
        const idColegioParam = params.get('idColegio');
        if (idColegioParam !== null) {
          this.colegioId = +idColegioParam;
        }
      }
    });
    this.getAllCursos();
    this.getAllColegios();
  }

  getAllColegios(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.cursoService.getAllC(this.colegioId).subscribe((data: Colegio[]) => {
      this.colegios = data.filter(colegio => colegio.idColegio === this.colegioId);
      console.log(this.colegios);
    });
  }

  getAllCursos(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.cursoService.getAll().subscribe((data: Curso[]) => {
      this.cursos = data.filter(profesor => profesor.idColegio === this.colegioId);
      console.log(this.cursos);
    })
  }
  

  agregarCurso(colegio: Colegio) {
    if (colegio && colegio.idColegio) {
      this.router.navigate(['curso/agregar-curso', colegio.idColegio]);
    }
  }
  verProfesor(colegio: Colegio) {
    if (colegio && colegio.idColegio) {
      this.router.navigate(['profesor/mp-visual-profesor', colegio.idColegio]);
    }
  }

  verCurso(curso: Curso) {
    if (curso && curso.idCurso) {
      this.router.navigate(['estudiantes/me-visual-estudiante', curso.idCurso]);
    }
  }
  verEncuestas(curso: Curso) {
    if (curso && curso.idCurso) {
      this.router.navigate(['/curso/detalle-encuesta', curso.idCurso]);
    }
  }
}