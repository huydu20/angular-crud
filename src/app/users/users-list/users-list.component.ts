import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users!: User[];
  displayUser!: User[]

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.pipe(delay(400)).subscribe((users) => {
      this.users = users
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }
}
