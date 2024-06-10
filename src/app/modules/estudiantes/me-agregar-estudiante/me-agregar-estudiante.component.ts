import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Estudiante, Curso } from '../estudiante';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-me-agregar-estudiante',
    standalone: true,
    templateUrl: './me-agregar-estudiante.component.html',
    styleUrls: ['./me-agregar-estudiante.component.css'],
    imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class MeAgregarEstudianteComponent implements OnInit {

  form!: FormGroup;
  cursos: Curso[] = [];
  idCurso: number = 0;
  submitDisabled: boolean = false;

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

    this.estudianteService.getAllCursos().subscribe((data: Curso[]) => {
      this.cursos = data;
    });

    this.form = new FormGroup({
      idEstudiante: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      FechaNacimiento: new FormControl('', Validators.required),
      Sexo: new FormControl('', Validators.required),
      Clave: new FormControl('', Validators.required),
      Anio: new FormControl('2024', Validators.required),
      idCurso: new FormControl(this.idCurso, Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  verificarRut(event: any) {
    const rut = event.target.value;

    if (!rut) {
        return;
    }

    const partesRut = rut.split('-');
    const numeroRut = partesRut[0];
    const digitoVerificador = partesRut[1];

    if (!numeroRut || !digitoVerificador) {
      this.form.get('idEstudiante')!.setErrors({ required: true, rutInvalido: true });
      return;
    }

    const valid = this.validateRutChileno(rut);

    if (valid) {
      this.submitDisabled = false;
      this.form.get('idEstudiante')!.setErrors(null);
    } else {
      this.submitDisabled = true;
      this.form.get('idEstudiante')!.setErrors({ rutInvalido: true });
    }
  }

  validateRutChileno(rut: string): boolean {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
        return false;
    }

    const rutSinGuion = rut.replace(/-/g, '');
    const rutSinDigitoVerificador = rutSinGuion.substring(0, rutSinGuion.length - 1);
    const digitoVerificador = rutSinGuion.substring(rutSinGuion.length - 1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = rutSinDigitoVerificador.length - 1; i >= 0; i--) {
        const digito = parseInt(rutSinDigitoVerificador[i]);
        suma += digito * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const digitoVerificadorCalculado = resto === 0 ? '0' : resto === 1 ? 'k' : String(11 - resto);

    return digitoVerificadorCalculado === digitoVerificador.toLowerCase();
  }

  submit() {
    console.log(this.form.value);
    this.estudianteService.createEstudiante(this.form.value).subscribe((res: any) => {
      console.log('Estudiante creado con éxito!');
      this.router.navigateByUrl('estudiantes/me-visual-estudiante/' + this.idCurso); // Ajustar la ruta según tu estructura
    });
  }
}
