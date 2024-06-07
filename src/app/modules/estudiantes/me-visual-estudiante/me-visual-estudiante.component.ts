import { Component, OnInit } from '@angular/core';
import { Curso, Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../estudiante.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx'

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
  validarFormatoFecha(fecha: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
  }

  convertirFecha(fecha: string): string {
    const [dd, mm, yyyy] = fecha.split('/');
    return `${yyyy}-${mm}-${dd}`;
  }
  
  Readexcel(event: any) {
    let file = event.target.files[0];
  
    let reader = new FileReader();
    reader.readAsBinaryString(file);
  
    reader.onload = (e) => {
      let workbook = XLSX.read(reader.result, { type: 'binary' });
      let sheetNames = workbook.SheetNames;
  
      let excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
  
      // Iterar sobre los datos y llamar al servicio para guardar cada estudiante
      excelData.forEach((data: any) => {
        let estudiante: Estudiante = {
          idEstudiante: data.idEstudiante,
          Nombre: data.Nombre,
          FechaNacimiento: data.FechaNacimiento,
          Sexo: data.Sexo,
          Clave: data.Clave,
          idCurso: this.idCurso,
          Anio: new Date().getFullYear() // Suponiendo que el año actual es el de matriculación
        };
  
        // Llamada al servicio para guardar el estudiante
        this.estudianteService.createEstudiante(estudiante).subscribe((response) => {
          console.log('Estudiante guardado correctamente:', response);
        }, (error) => {
          console.error('Error al guardar estudiante:', error);
        });
      });
    }
  }
  
  

  triggerFileUpload() {
    const fileUploadInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileUploadInput) {
      fileUploadInput.click();
    }
  }

  agregarEstudiante(): void {
    this.router.navigate(['estudiantes/me-agregar-estudiante', { idCurso: this.idCurso }]);
  }

  verEstudiante(idEstudiante: string): void {
    this.router.navigate(['/estudiantes', idEstudiante, 'me-actualizar-estudiante']);
  }
}