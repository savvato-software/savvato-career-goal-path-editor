import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilestonesPage } from './milestones.page';

const routes: Routes = [
  {
    path: '',
    component: MilestonesPage
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
export class MilestonesPageRoutingModule {}
