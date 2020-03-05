import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PathsPage } from './paths.page';

const routes: Routes = [
  {
    path: '',
    component: PathsPage
  },
  {
    path: 'edit/new',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'edit/:pathId',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'display/:pathId',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathsPageRoutingModule {}
