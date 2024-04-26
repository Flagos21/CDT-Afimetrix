import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfesorService } from '../profesor.service';
import { Profesor } from '../profesor';

@Component({
  selector: 'app-mp-actualizar-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mp-actualizar-profesor.component.html',
  styleUrl: './mp-actualizar-profesor.component.css'
})
export class MpActualizarProfesorComponent {
  idProfesor!: string;
  profesor!: Profesor;
  form!: FormGroup;

  constructor(
    public profesorService: ProfesorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idProfesor = this.route.snapshot.params['profesorId'];
    this.profesorService.find(this.idProfesor).subscribe((data: Profesor) => {
      this.profesor = data;
    });

    this.form = new FormGroup({
      idProfesor: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', Validators.required),
      Clave: new FormControl('', Validators.required),
      idColegio: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.profesorService
      .update(this.idProfesor, this.form.value)
      .subscribe((res: any) => {
        console.log('Profesor actualizado con exito!');
        this.router.navigateByUrl('profesor/mp-visual-profesor');
      });
  }
}

