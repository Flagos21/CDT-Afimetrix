import { Component, OnInit } from '@angular/core';
import { Profesor, Colegio, Ciudad, Fundacion} from '../profesor';
import { CommonModule } from '@angular/common';
import { ProfesorService } from '../profesor.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-mp-visual-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mp-visual-profesor.component.html',
  styleUrls: ['./mp-visual-profesor.component.css']
})
export class MpVisualProfesorComponent implements OnInit {
  profesores: Profesor[] = [];
  colegios: Colegio[] = [];
  ciudades: Ciudad[] = [];
  fundaciones: Fundacion[] = [];
  idColegioSeleccionado: number = 4;

  constructor(public profesorService: ProfesorService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProfesoresByColegioId();
    this.getAllColegioByColegioId();
    this.mostrarNombreCiudad();

  }
  getAllProfesoresByColegioId(): void{
    console.log(this.router.url);
    console.log(window.location.href);
    this.profesorService.getAll().subscribe((data: Profesor[]) => {
      this.profesores = data.filter(profesor => profesor.idColegio === this.idColegioSeleccionado);
      console.log(this.profesores);
    });
  }
  getAllColegioByColegioId():void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.profesorService.getAllC().subscribe((data: Colegio[]) => {
      this.colegios = data.filter(colegio => colegio.idColegio === this.idColegioSeleccionado);
      console.log(this.colegios);
    });
  }
  
  mostrarNombreCiudad(): void {
    if (this.colegios && this.colegios.length > 0) {
        const idColegioSeleccionado = this.idColegioSeleccionado;
        const colegioSeleccionado = this.colegios.find(colegio => colegio.idColegio === idColegioSeleccionado);

        if (colegioSeleccionado) {
            const idCiudadColegio = colegioSeleccionado.idCiudad;

            this.profesorService.getAllC().subscribe((data: Ciudad[]) => {
                this.ciudades = data.filter(ciudad => ciudad.idCiudad === idCiudadColegio);
                console.log(this.ciudades);
            });
        } else {
            console.error('El colegio seleccionado no tiene un ID de ciudad válido.');
        }
    } else {
        console.error('No se encontraron colegios.');
    }
}



  agregarProfesor() {
    this.router.navigateByUrl('profesor/mp-agregar-profesor');
  }
  actualizarProfesor(idProfesor: string): void {
    this.router.navigate(['/profesor', idProfesor, 'mp-actualizar-profesor']);
  }

}
