import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerGoalsPage } from './career-goals.page';

const routes: Routes = [
  {
    path: '',
    component: CareerGoalsPage
  },
  {
    path: 'edit/new',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'edit/:careerGoalId',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'display/:careerGoalId',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerGoalsPageRoutingModule {}
