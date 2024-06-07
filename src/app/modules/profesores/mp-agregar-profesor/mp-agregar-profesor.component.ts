import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ProfesorService } from '../profesor.service';
import { Colegio } from '../profesor';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-mp-agregar-profesor',
    standalone: true,
    templateUrl: './mp-agregar-profesor.component.html',
    styleUrl: './mp-agregar-profesor.component.css',
    imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class MpAgregarProfesorComponent {
  form!: FormGroup;
  colegioIdFromUrl: number = 0;

  constructor(
    public profesorService: ProfesorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params !== null && params.has('idColegio')) {
        const idColegioParam = params.get('idColegio');
        if (idColegioParam !== null) {
          this.colegioIdFromUrl = +idColegioParam;
        }
      }
    });

    this.form = this.formBuilder.group({
      idProfesor: ['', [Validators.required]],
      Nombre: ['', Validators.required],
      Clave: ['', Validators.required],
      idColegio: [this.colegioIdFromUrl, Validators.required],
      Tipo: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.form.patchValue({ idColegio: this.colegioIdFromUrl });
    console.log(this.form.value);
    this.profesorService.create(this.form.value).subscribe(
      (res: any) => {
        console.log('Profesor creado con éxito!');
        this.router.navigateByUrl(
          '/profesor/mp-visual-profesor/' + this.colegioIdFromUrl
        ); // Poner Ruta
      },
      (error: any) => {
        console.error('Error al crear el profesor:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }
}