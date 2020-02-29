import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboursPage } from './labours.page';

const routes: Routes = [
  {
    path: '',
    component: LaboursPage
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
export class LaboursPageRoutingModule {}
