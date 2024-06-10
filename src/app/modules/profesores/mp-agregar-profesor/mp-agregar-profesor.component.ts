import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProfesorService } from '../profesor.service';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-mp-agregar-profesor',
    standalone: true,
    templateUrl: './mp-agregar-profesor.component.html',
    styleUrls: ['./mp-agregar-profesor.component.css'],
    imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class MpAgregarProfesorComponent implements OnInit {
  form!: FormGroup;
  colegioIdFromUrl: number = 0;
  submitDisabled: boolean = false;

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

  verificarRut(event: any) {
    const rut = event.target.value;

    if (!rut) {
      return;
    }

    const partesRut = rut.split('-');
    const numeroRut = partesRut[0];
    const digitoVerificador = partesRut[1];

    if (!numeroRut || !digitoVerificador) {
      this.form.get('idProfesor')!.setErrors({ required: true, rutInvalido: true });
      return;
    }

    const valid = this.validateRutChileno(rut);

    if (valid) {
      this.submitDisabled = false;
      this.form.get('idProfesor')!.setErrors(null);
    } else {
      this.submitDisabled = true;
      this.form.get('idProfesor')!.setErrors({ rutInvalido: true });
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
    this.form.patchValue({ idColegio: this.colegioIdFromUrl });
    console.log(this.form.value);
    this.profesorService.create(this.form.value).subscribe(
      (res: any) => {
        console.log('Profesor creado con éxito!');
        this.router.navigateByUrl('/profesor/mp-visual-profesor/' + this.colegioIdFromUrl); // Ajustar la ruta según tu estructura
      },
      (error: any) => {
        console.error('Error al crear el profesor:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }
}
