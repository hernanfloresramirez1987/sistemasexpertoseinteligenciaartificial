import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./core/components/home/home.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./core/components/login/login.component')
    },
    {
        path: 'objetos',
        loadComponent: () => import('./core/object-detection/object-detection.component')
    },
    {
        path: 'textoavoz',
        loadComponent: () => import('./core/tts/tts.component')
    }
];
