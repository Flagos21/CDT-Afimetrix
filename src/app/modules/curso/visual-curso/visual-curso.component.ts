import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso, Colegio } from '../curso';
import { CommonModule } from '@angular/common';
import { CursoService } from '../curso.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visual-curso',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visual-curso.component.html',
  styleUrl: './visual-curso.component.css'
})
export class VisualCursoComponent implements OnInit {
  cursos: Curso[] = [];
  colegioId: number = 1; // Establecer un valor predeterminado
  colegios: Colegio[] = [];

  constructor(
    public cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllColegios(); // Llamar a getAllColegios() aquí para asegurar que se carguen los colegios al iniciar el componente
    this.route.params.subscribe(params => {
      this.colegioId = +params['idColegio']; // Convertir el idColegio a número
      this.getAllCursos();
    });
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

  agregarCurso() {
    this.router.navigateByUrl('curso/agregar-curso');
  }

  verProfesor() {
    this.router.navigateByUrl('estudiantes/me-agregar-estudiante');
  }

  verCurso() {
    if (this.colegioId) {
      this.router.navigateByUrl(`/curso/detalles-curso/${this.colegioId}`);
    }
  }
}
