import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit  {
  users$!: Observable<User[] | null>

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.users$ = this.userService.users$.pipe(delay(500))
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
  }
}
