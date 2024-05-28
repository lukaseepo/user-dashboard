import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'user-dashboard'
}, {
  path: 'user-dashboard',
  loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
  canActivate: [AuthGuard]
}, {
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
}, {
  path: 'user-details',
  loadChildren: () => import('./user-details/user-details.module').then((m) => m.UserDetailsModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
