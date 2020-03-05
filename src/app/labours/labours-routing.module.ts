import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboursPage } from './labours.page';

const routes: Routes = [
  {
    path: '',
    component: LaboursPage
  },
  {
    path: 'edit/new',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'edit/:labourId',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'display/:labourId',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboursPageRoutingModule {}
