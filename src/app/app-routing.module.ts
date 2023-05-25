import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard]},
  { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then((m) => m.AccountModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
