import { Routes } from '@angular/router';
import { MeAgregarEstudianteComponent } from './modules/estudiantes/me-agregar-estudiante/me-agregar-estudiante.component';
import { MeVisualEstudianteComponent } from './modules/estudiantes/me-visual-estudiante/me-visual-estudiante.component';
import { MeActualizarEstudianteComponent } from './modules/estudiantes/me-actualizar-estudiante/me-actualizar-estudiante.component';
import { AgregarCursoComponent } from './modules/curso/agregar-curso/agregar-curso.component';
import { MpAgregarProfesorComponent } from './modules/profesor/mp-agregar-profesor/mp-agregar-profesor.component';
import { AgregarColegioComponent } from './modules/colegio/agregar-colegio/agregar-colegio.component';
import { VisualColeComponent } from './modules/colegio/visual-cole/visual-cole.component';
import { Component } from '@angular/core';
import { VisualCursoComponent } from './modules/curso/visual-curso/visual-curso.component';


export const routes: Routes = [
    {path : '' , pathMatch : 'full' , redirectTo : ''},

        //Rutas Estudiante

    {path : 'estudiantes/me-visual-estudiante', component : MeVisualEstudianteComponent},
    {path : 'estudiantes/me-agregar-estudiante', component : MeAgregarEstudianteComponent},
    {path : 'estudiantes/:estudianteId/me-actualizar-estudiante', component : MeActualizarEstudianteComponent},

        //Rutas Profesor

    {path : 'profesor/mp-agregar-profesor', component : MpAgregarProfesorComponent},

        //Rutas Curso
    
    {path : 'curso/agregar-curso', component : AgregarCursoComponent},

    {path: 'curso/visual-curso/:idColegio', component : VisualCursoComponent},

        //Rutas Colegio
    
    {path : 'colegio/agregar-colegio', component : AgregarColegioComponent},

    {path : 'colegio/visual-cole', component : VisualColeComponent}

];
