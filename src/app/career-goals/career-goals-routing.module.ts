import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerGoalsPage } from './career-goals.page';

const routes: Routes = [
  {
    path: '',
    component: CareerGoalsPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerGoalsPageRoutingModule {}
