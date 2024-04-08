import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColegioService } from '../colegio.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-colegio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-colegio.component.html',
  styleUrl: './agregar-colegio.component.css'
})
export class AgregarColegioComponent {

  form!: FormGroup;

  constructor(
    public colegioService: ColegioService,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.form = new FormGroup({
      idColegio: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      idFundacion: new FormControl('', Validators.required),
      idCiudad: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.colegioService.create(this.form.value).subscribe((res:any) => {
      console.log('Colegio Creado');
      this.router.navigateByUrl(''); //Poner Ruta
    })
  }
}
