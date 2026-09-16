import { Routes } from '@angular/router';
import { LineBuilderComponent } from './components/line-builder/line-builder';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: LineBuilderComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];