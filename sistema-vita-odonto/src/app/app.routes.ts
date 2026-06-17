import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Pacientes } from './pages/pacientes/pacientes';
import { Especialidades } from './pages/especialidades/especialidades';
import { Dentistas } from './pages/dentistas/dentistas';
import { Usuarios } from './pages/usuarios/usuarios';
import { Consultas } from './pages/consultas/consultas';
import { Relatorio } from './pages/relatorio/relatorio';
import { LayoutComponent } from './layout-component/layout-component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'pacientes', component: Pacientes },
            { path: 'consultas', component: Consultas },
            { path: 'dentistas', component: Dentistas, canActivate: [authGuard] },
            { path: 'especialidades', component: Especialidades, canActivate: [authGuard] },
            { path: 'usuarios', component: Usuarios, canActivate: [authGuard] },
            { path: 'relatorios', component: Relatorio, canActivate: [authGuard] },
        ]
    },
];
