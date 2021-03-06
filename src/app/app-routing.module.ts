import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/navigation-tabs/navigation-tabs.module').then(m => m.NavigationTabsPageModule)
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
