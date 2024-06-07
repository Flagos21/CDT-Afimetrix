import { Component, OnInit } from '@angular/core';
import { Encuesta, Curso } from '../encuesta';
import { CommonModule } from '@angular/common';
import { EncuestaService } from '../encuesta.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import moment from 'moment';
@Component({
  selector: 'app-detalle-encuesta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-encuesta.component.html',
  styleUrl: './detalle-encuesta.component.css',
})
export class DetalleEncuestaComponent implements OnInit {
  encuestas: Encuesta[] = [];
  cursos: Curso[] = [];
  cursoIdFromURL: number = 0;

  constructor(
    public encuestaService: EncuestaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params !== null && params.has('idCurso')) {
        const idCursoParam = params.get('idCurso');
        if (idCursoParam !== null) {
          this.cursoIdFromURL = +idCursoParam;
        }
      }
    });
    this.getAllEncuestasByCursoId();
    this.getAllCursos();
  }
  getAllEncuestasByCursoId(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.encuestaService.getAll().subscribe((data: Encuesta[]) => {
      this.encuestas = data.filter(
        (encuesta) => encuesta.idCurso === this.cursoIdFromURL
      );
      console.log(this.encuestas);
    });
  }
  getAllCursos(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.encuestaService.getAllCurso().subscribe((data: Curso[]) => {
      this.cursos = data.filter(
        (curso) => curso.idCurso === this.cursoIdFromURL
      );
      console.log(this.cursos);
    });
  }
  crearEncuesta(curso: Curso) {
    if (curso && curso.idCurso) {
      this.router.navigate([
        'curso/detalle-encuesta/crear-encuesta',
        curso.idCurso,
      ]);
    }
  }
  descargarConsentimientos() {
    const pdfFiles = [
      'Formulario_CEC_Consentimiento_informado.pdf',
      'Formulario_CEC_Asentimiento_informado.pdf',
    ];
    const basePath = '/assets/documents/';
    
    pdfFiles.forEach((file) => {
      this.downloadFile(`${basePath}${file}`, file);
    });
  }  

  private downloadFile(url: string, fileName: string) {
    this.httpClient.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  }

  formatDate(dateString: string): string {
    return moment(dateString).format('DD-MM-YYYY');
  }
}
