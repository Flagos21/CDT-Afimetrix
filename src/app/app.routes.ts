import { Routes } from '@angular/router';
import { MeAgregarEstudianteComponent } from './modules/estudiantes/me-agregar-estudiante/me-agregar-estudiante.component';
import { MeVisualEstudianteComponent } from './modules/estudiantes/me-visual-estudiante/me-visual-estudiante.component';
import { MeActualizarEstudianteComponent } from './modules/estudiantes/me-actualizar-estudiante/me-actualizar-estudiante.component';
import { AgregarCursoComponent } from './modules/curso/agregar-curso/agregar-curso.component';
import { MpAgregarProfesorComponent } from './modules/profesores/mp-agregar-profesor/mp-agregar-profesor.component';
import { MpVisualProfesorComponent } from './modules/profesores/mp-visual-profesor/mp-visual-profesor.component';
import { MpActualizarProfesorComponent } from './modules/profesores/mp-actualizar-profesor/mp-actualizar-profesor.component';
import { AgregarColegioComponent } from './modules/colegio/agregar-colegio/agregar-colegio.component';
import { VisualCursoComponent } from './modules/curso/visual-curso/visual-curso.component';
import { VisualColeComponent } from './modules/colegio/visual-cole/visual-cole.component';
import { CrearEncuestaComponent } from './modules/encuesta/crear-encuesta/crear-encuesta.component';
import { DetalleEncuestaComponent } from './modules/encuesta/detalle-encuesta/detalle-encuesta.component';
import { DashboardVisualComponent } from './modules/dashboard/dashboard-visual/dashboard-visual.component';
import { PreguntasComponent } from './modules/preguntas-frecuentes/preguntas/preguntas.component';


export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'dashboard/dashboard-visual' },

    //Rutas Estudiante

    {
        path: 'estudiantes/me-visual-estudiante',
        component: MeVisualEstudianteComponent,
    },
    {
        path: 'estudiantes/me-visual-estudiante/:idCurso',
        component: MeVisualEstudianteComponent,
    },
    {
        path: 'estudiantes/me-agregar-estudiante',
        component: MeAgregarEstudianteComponent,
    },
    {
        path: 'estudiantes/:estudianteId/me-actualizar-estudiante',
        component: MeActualizarEstudianteComponent,
    },

    //Rutas Profesor

    { path: 'profesor/mp-agregar-profesor', component: MpAgregarProfesorComponent },
    { path: 'profesor/mp-agregar-profesor/:idColegio', component: MpAgregarProfesorComponent },
    { path: 'profesor/mp-visual-profesor', component: MpVisualProfesorComponent },
    { path: 'profesor/mp-visual-profesor/:idColegio', component: MpVisualProfesorComponent },
    { path: 'profesor/:profesorId/mp-actualizar-profesor', component: MpActualizarProfesorComponent },


    //Rutas Curso

    { path: 'curso/agregar-curso', component: AgregarCursoComponent },
    { path: 'curso/agregar-curso/:idColegio', component: AgregarCursoComponent },
    { path: 'curso/visual-curso', component: VisualCursoComponent },

    { path: 'curso/visual-curso/:idColegio', component: VisualCursoComponent },

    //Rutas Colegio

    { path: 'colegio/agregar-colegio', component: AgregarColegioComponent },
    { path: 'colegio/visual-cole', component: VisualColeComponent },


    // Rutas Encuesta
    { path: 'curso/detalle-encuesta/crear-encuesta', component: CrearEncuestaComponent },
    { path: 'curso/detalle-encuesta/crear-encuesta/:idCurso', component: CrearEncuestaComponent },
    { path: 'curso/detalle-encuesta', component: DetalleEncuestaComponent },
    { path: 'curso/detalle-encuesta/:idCurso', component: DetalleEncuestaComponent },

    //Preguntas frecuentes 
    { path: 'preguntas-frecuentes/preguntas', component: PreguntasComponent},
    {path: 'dashboard/dashboard-visual' , component: DashboardVisualComponent}
];
