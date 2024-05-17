import { Component, OnInit } from '@angular/core';
import { Curso, Colegio, Ciudad, Fundacion } from '../curso';
import { CommonModule } from '@angular/common';
import { CursoService } from '../curso.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visual-curso',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './visual-curso.component.html',
  styleUrl: './visual-curso.component.css',
})
export class VisualCursoComponent implements OnInit {
  cursos: Curso[] = [];
  colegioId: number = 0; // Establecer un valor predeterminado
  colegios: Colegio[] = [];
  cursoIdFromURL: number = 0;

  constructor(
    public cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllColegios(); // Llamar a getAllColegios() aquí para asegurar que se carguen los colegios al iniciar el componente
    this.route.params.subscribe(params => {
      this.colegioId = +params['idColegio']; // Convertir el idColegio a número
      this.getAllCursos();
    });
    this.route.paramMap.subscribe(params => {
      if (params !== null && params.has('idCurso')) {
        const idCursoParam = params.get('idCurso');
        if (idCursoParam !== null) {
          this.cursoIdFromURL = +idCursoParam;
        }
      }
    })
  }

  getAllColegios(): void {
    if (this.colegioId !== undefined) {
      this.cursoService.getAllC().subscribe((data: Colegio[]) => {
        const colegioEncontrado = data.find(colegio => colegio.idColegio === this.colegioId);
        if (colegioEncontrado) {
          this.colegios = [colegioEncontrado];
        } else {
          console.log(`No se encontró ningún colegio con el ID ${this.colegioId}`);
        }
      });
    } else {
      console.log(`colegioId es undefined`);
    }
  }

  getAllCursos(): void {
    if (this.colegioId) {
      this.cursoService.getCursosByColegioId(this.colegioId).subscribe((data: Curso[]) => {
        this.cursos = data;
        console.log(this.cursos);
      });
    }
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

  verCurso() {
    if (this.colegioId) {
      this.router.navigateByUrl('estudiantes/me-visual-estudiante');
    }
  }
  verEncuestas(curso: Curso) {
    if (curso && curso.idCurso) {
      this.router.navigate(['/curso/detalle-encuesta', curso.idCurso]);
    }
  }
}
