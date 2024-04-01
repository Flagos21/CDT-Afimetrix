import { Routes } from '@angular/router';
import { MeAgregarEstudianteComponent } from './modules/estudiante/me-agregar-estudiante/me-agregar-estudiante.component';
import { MeVisualEstudianteComponent } from './modules/estudiante/me-visual-estudiante/me-visual-estudiante.component';
import { MeActualizarEstudianteComponent } from './modules/estudiante/me-actualizar-estudiante/me-actualizar-estudiante.component';
import { AgregarCursoComponent } from './modules/curso/agregar-curso/agregar-curso.component';
import { MpAgregarProfesorComponent } from './modules/profesor/mp-agregar-profesor/mp-agregar-profesor.component';


export const routes: Routes = [
    {path : '' , pathMatch : 'full' , redirectTo : ''},

        //Rutas Estudiante

    {path : 'estudiante/me-visual-estudiante', component : MeVisualEstudianteComponent},
    {path : 'estudiante/me-agregar-estudiante', component : MeAgregarEstudianteComponent},
    {path : 'estudiante/:estudianteId/me-actualizar-estudiante', component : MeActualizarEstudianteComponent},

        //Rutas Profesor

    {path : 'profesor/mp-agregar-profesor', component : MpAgregarProfesorComponent},

        //Rutas Colegio
    
    {path : 'curso/agregar-curso', component : AgregarCursoComponent}



];
