import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'career-goals',
    pathMatch: 'full'
  },
  {
    path: 'career-goals',
    loadChildren: () => import('./career-goals/career-goals.module').then( m => m.CareerGoalsPageModule)
  },
  {
    path: 'paths',
    loadChildren: () => import('./paths/paths.module').then( m => m.PathsPageModule)
  },
  {
    path: 'milestones',
    loadChildren: () => import('./milestones/milestones.module').then( m => m.MilestonesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
