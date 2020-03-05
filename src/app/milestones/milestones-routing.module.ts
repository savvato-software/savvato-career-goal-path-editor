import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilestonesPage } from './milestones.page';

const routes: Routes = [
  {
    path: '',
    component: MilestonesPage
  },
  {
    path: 'edit/new',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'edit/:milestoneId',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'display/:milestoneId',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilestonesPageRoutingModule {}
