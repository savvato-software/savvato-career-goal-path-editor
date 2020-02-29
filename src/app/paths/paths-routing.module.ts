import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PathsPage } from './paths.page';

const routes: Routes = [
  {
    path: '',
    component: PathsPage
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
export class PathsPageRoutingModule {}
