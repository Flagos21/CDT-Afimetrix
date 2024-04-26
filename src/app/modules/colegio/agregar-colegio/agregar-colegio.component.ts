import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColegioService } from '../colegio.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Ciudad, Fundacion, } from '../colegio';

@Component({
  selector: 'app-agregar-colegio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-colegio.component.html',
  styleUrl: './agregar-colegio.component.css'
})
export class AgregarColegioComponent implements OnInit {

  form!: FormGroup;
  ciudades: any[] = [];
  fundacion: any[] = []

  constructor(
    public colegioService: ColegioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idColegio: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required]),
      idFundacion: new FormControl('', [Validators.required]),
      idCiudad: new FormControl('', [Validators.required])
    });

    // Cargar la lista de ciudades desde el servicio de ciudades
      this.colegioService.getAllC().subscribe((data: Ciudad[]) => {
        this.ciudades = data;
    });
    
    this.colegioService.getAllF().subscribe((data: Fundacion[]) => {
      this.fundacion = data;
  });

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.colegioService.create(this.form.value).subscribe((res: any) => {
      console.log('Colegio Creado');
      this.router.navigateByUrl(''); //Poner Ruta
    });
  }
}
