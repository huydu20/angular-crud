import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';
import { utils, writeFile } from 'xlsx';

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
  isSearching = false;
  currentPage = 1;
  numOfItemOnPage = 5;
  showModalDelete: boolean = false;
  modalEvent: boolean = false;

  userIdToDelete: number = 0;

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

  deleteUser() {
    this.userService.deleteUser(this.userIdToDelete);
    this.showModalDelete = false;
  }

  onCloseDeleteModal(event: boolean) {
    this.modalEvent = event;
    this.showModalDelete = false;
  }

  updateDisplayList(event: User[]) {
    this.displayUser = event;
    const reader = new FileReader();
  }

  updateCurrentPage(current: number) {
    this.currentPage = current;
  }

  onSearching(event: boolean) {
    this.isSearching = event;
  }

  setUserIdToDelete(id: number) {
    this.userIdToDelete = id;
    this.showModalDelete = true;
  }

  importCSV() {

  }

  exportToCSV() {
    if (this.users.length === 0) {
      return alert('Empty list!');
    } else {
      const heading = [['ID', 'Username', 'Password', 'First Name', "Last Name"]];
      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, heading);
      utils.sheet_add_json(ws, this.users, {
        origin: 'A2',
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, 'Users');
      writeFile(wb, 'data.csv');
    }
  }
}
