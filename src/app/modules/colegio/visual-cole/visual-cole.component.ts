import { Component, OnInit } from '@angular/core';
import { Colegio } from '../colegio';
import { RouterModule, Router } from '@angular/router';
import { ColegioService } from '../colegio.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-visual-cole',
    standalone: true,
    templateUrl: './visual-cole.component.html',
    styleUrls: ['./visual-cole.component.css'],
    imports: [CommonModule, RouterModule, SidebarComponent]
})
export class VisualColeComponent implements OnInit {
  colegios: Colegio[] = [];
  filteredColegios: Colegio[] = [];
  searchTerm$ = new Subject<string>();
  colegioId: number = 0 ;
  

  constructor(public colegioService: ColegioService, private router: Router) {}

  ngOnInit(): void {
    // Obtener datos de colegios de la base de datos
    this.colegioService.getAll().subscribe((data: Colegio[]) => {
      this.colegios = data;
      // Inicializar `filteredColegios` con todos los colegios inicialmente
      this.filteredColegios = data;
    });

    // Configurar la suscripción a `searchTerm$`
    this.searchTerm$.pipe(debounceTime(300)).subscribe(term => {
      this.filterList(term);
    });
  }

  filterList(term: string): void {
    // Filtrar `colegios` por el término de búsqueda y asignar a `filteredColegios`
    this.filteredColegios = this.colegios.filter(colegio => 
      colegio.Nombre.toLowerCase().includes(term.toLowerCase())
    );
  }

  
  onSearch(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (input) {
        this.searchTerm$.next(input.value);
    }
}



agregarColegio(): void {
  this.router.navigate(['/colegio/agregar-colegio']);
}

verDetalles(colegio: Colegio): void {
  if (colegio && colegio.idColegio) {
    this.router.navigate(['/curso/visual-curso', colegio.idColegio]); 
  }
}

}

