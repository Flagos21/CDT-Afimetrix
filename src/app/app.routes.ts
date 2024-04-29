import { Routes } from '@angular/router';
import { MeAgregarEstudianteComponent } from './modules/estudiante/me-agregar-estudiante/me-agregar-estudiante.component';
import { MeVisualEstudianteComponent } from './modules/estudiante/me-visual-estudiante/me-visual-estudiante.component';
import { MeActualizarEstudianteComponent } from './modules/estudiante/me-actualizar-estudiante/me-actualizar-estudiante.component';
import { AgregarCursoComponent } from './modules/curso/agregar-curso/agregar-curso.component';
import { MpAgregarProfesorComponent } from './modules/profesores/mp-agregar-profesor/mp-agregar-profesor.component';
import { MpVisualProfesorComponent } from './modules/profesores/mp-visual-profesor/mp-visual-profesor.component';
import { MpActualizarProfesorComponent } from './modules/profesores/mp-actualizar-profesor/mp-actualizar-profesor.component';
import { AgregarColegioComponent } from './modules/colegio/agregar-colegio/agregar-colegio.component';
import { DetalleEncuestaComponent } from './modules/encuesta/detalle-encuesta/detalle-encuesta.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '' },

    //Rutas Estudiante

    { path: 'estudiante/me-visual-estudiante', component: MeVisualEstudianteComponent },
    { path: 'estudiante/me-agregar-estudiante', component: MeAgregarEstudianteComponent },
    { path: 'estudiante/:estudianteId/me-actualizar-estudiante', component: MeActualizarEstudianteComponent },

    //Rutas Profesor

    { path: 'profesor/mp-agregar-profesor', component: MpAgregarProfesorComponent },
    { path: 'profesor/mp-agregar-profesor/:idColegio', component: MpAgregarProfesorComponent },
    { path: 'profesor/mp-visual-profesor', component: MpVisualProfesorComponent },
    { path: 'profesor/mp-visual-profesor/:idColegio', component: MpVisualProfesorComponent },
    { path: 'profesor/:profesorId/mp-actualizar-profesor', component: MpActualizarProfesorComponent },

    //Rutas Curso

    { path: 'curso/agregar-curso', component: AgregarCursoComponent },

    //Rutas Colegio

    { path: 'curso/agregar-colegio', component: AgregarColegioComponent },

    //Rutas Encuesta    

    { path: 'encuesta/detalle-ecuesta', component: DetalleEncuestaComponent }



];
