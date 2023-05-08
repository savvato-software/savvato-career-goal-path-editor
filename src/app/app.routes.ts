import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'career-goals',
    pathMatch: 'full'
  },
  {
    path: 'career-goals',
    loadComponent: () => import('./career-goals/career-goals.page').then( m => m.CareerGoalsPage)
  },
  {
    path: 'career-goals/display/:careerGoalId',
    loadComponent: () => import('./career-goals/display/display.page').then( m => m.DisplayPage)
  },
  {
    path: 'career-goals/edit/:careerGoalId',
    loadComponent: () => import('./career-goals/edit/edit.page').then( m => m.EditPage)
  },
  {
    path: 'labours',
    loadComponent: () => import('./labours/labours.page').then( m => m.LaboursPage)
  },
  {
    path: 'labours/edit/:labourId',
    loadComponent: () => import('./labours/edit/edit.page').then( m => m.EditPage)
  },
  {
    path: 'labours/display/:labourId',
    loadComponent: () => import('./labours/display/display.page').then( m => m.DisplayPage)
  },
  {
    path: 'milestones',
    loadComponent: () => import('./milestones/milestones.page').then( m => m.MilestonesPage)
  },
  {
    path: 'milestones/edit/:milestoneId',
    loadComponent: () => import('./milestones/edit/edit.page').then( m => m.EditPage)
  },
  {
    path: 'milestones/display/:milestoneId',
    loadComponent: () => import('./milestones/display/display.page').then( m => m.DisplayPage)
  },
  {
    path: 'paths',
    loadComponent: () => import('./paths/paths.page').then( m => m.PathsPage)
  },
  {
    path: 'paths/edit/:pathId',
    loadComponent: () => import('./paths/edit/edit.page').then( m => m.EditPage)
  },
  {
    path: 'paths/display/:pathId',
    loadComponent: () => import('./paths/display/display.page').then( m => m.DisplayPage)
  },
  // {
  //   path: 'career-goals',
  //   loadChildren: () => import('./career-goals/career-goals.module').then( m => m.CareerGoalsPageModule)
  // },
  // {
  //   path: 'paths',
  //   loadChildren: () => import('./paths/paths.module').then( m => m.PathsPageModule)
  // },
  // {
  //   path: 'milestones',
  //   loadChildren: () => import('./milestones/milestones.module').then( m => m.MilestonesPageModule)
  // },
  // {
  //   path: 'labours',
  //   loadChildren: () => import('./labours/labours.module').then( m => m.LaboursPageModule)
  // }
];
