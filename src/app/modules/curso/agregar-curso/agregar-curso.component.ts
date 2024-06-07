import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../curso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Colegio, Profesor } from '../curso';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-agregar-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css']
})
export class AgregarCursoComponent implements OnInit {

  form!: FormGroup;
  profesores: Profesor[] = [];
  colegios: Colegio[] = [];
  colegioIdFromUrl: number = 0;
  idCurso: number = 0;

  constructor(
    public cursoService: CursoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params !== null && params.has('idColegio')) {
        const idColegioParam = params.get('idColegio');
        if (idColegioParam !== null) {
          this.colegioIdFromUrl = +idColegioParam;
        }
      }
    });

    // Obtener lista de colegios
    this.cursoService.getAllC(this.colegioIdFromUrl).subscribe((data: Colegio[]) => {
      this.colegios = data;
    });

    this.form = this.formBuilder.group({
      idColegio: [this.colegioIdFromUrl, Validators.required],
      idProfesor: ['', Validators.required],
      Nombre: ['', Validators.required],
    });

    // Obtener lista de profesores filtrados por el colegio seleccionado
    this.updateProfesores(this.colegioIdFromUrl);
  }

  // Obtener lista de profesores filtrados por el colegio seleccionado
  updateProfesores(idColegio: number): void {
    this.cursoService.getAllP().subscribe((data: Profesor[]) => {
      this.profesores = data.filter(profesor => profesor.idColegio === idColegio);
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.cursoService.create(this.form.value).subscribe((res: any) => {
      console.log('Curso creado con éxito!');
      this.router.navigateByUrl('curso/visual-curso/' + this.colegioIdFromUrl); // Ajustar la ruta según tu estructura
    });
  }
}