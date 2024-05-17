import { Component, OnInit } from '@angular/core';
import { Curso, Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../estudiante.service';
import { RouterModule, Router } from '@angular/router';
import * as XLSX from 'xlsx'


;


@Component({
  selector: 'app-me-visual-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './me-visual-estudiante.component.html',
  styleUrls: ['./me-visual-estudiante.component.css']
})
export class MeVisualEstudianteComponent implements OnInit {
agregarEstudiante() {
throw new Error('Method not implemented.');
}
verEstudiantes(arg0: string) {
throw new Error('Method not implemented.');
}
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  cursoId: number = 1;
  Exceldata: any;

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
          Clave: data.Clave
        };
  
        // Llamada al servicio para guardar el estudiante
        this.estudianteService.create(estudiante).subscribe((response) => {
          console.log('Estudiante guardado correctamente:', response);
        }, (error) => {
          console.error('Error al guardar estudiante:', error);
        });
      });
    }
    
  }

  

}
  
  



