import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  displayUser: User[] = [];
  isLoading = false;
  currentPage = 1;
  numOfItemOnPage = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        delay(400),
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe((users) => {
        this.users = users;
        this.displayUser = users.length > this.numOfItemOnPage ? users.slice(0, this.numOfItemOnPage) : users;
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  updateDisplayList(event: User[]) {
    this.displayUser = event
  }
}
