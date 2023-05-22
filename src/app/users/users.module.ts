import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginGuard } from '../guards/login.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', component: UsersListComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
    ],
  },
];

@NgModule({
  declarations: [UsersComponent, UsersListComponent, AddUserComponent, EditUserComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersModule {}
