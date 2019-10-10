import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavigationTabsPage } from './navigation-tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: NavigationTabsPage,
    children: [
      {
        path: 'accounts',
        children: [
          {
            path: '',
            loadChildren: () => import('../accounts/accounts.module').then(m => m.AccountsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/accounts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/accounts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class NavigationTabsRoutingModule {
}
