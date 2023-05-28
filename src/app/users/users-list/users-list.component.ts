import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';

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
  showModalExport: boolean = false;

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

  onCloseModal() {
    this.showModalDelete = false;
    this.showModalExport = false;
  }

  updateDisplayList(event: User[]) {
    this.displayUser = event;
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

  importCSV(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = read(data, { type: 'array' });

      // Get the first worksheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert the worksheet to JSON
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      // Process the JSON data
      const list: User[] = [];
      jsonData.forEach((user: any, index) => {
        if (index !== 0) {
          let temp: User = new User(user[0], user[1], user[2], user[3], user[4]);
          list.push(temp)
        }
      });
      this.userService.importDataFromFile(list)
    };
    reader.readAsArrayBuffer(file);
  }

  onExport() {
    this.showModalExport = true;
  }

  exportToCSV() {
    if (this.users.length === 0) {
      return alert('Empty list!');
    } else {
      // convert ID to string
      const newUsers = this.users.map((user) => {
        return {
          ...user,
          id: user.id.toString(),
        };
      });
      console.log(newUsers);
      const heading = [['ID', 'Username', 'Password', 'First Name', 'Last Name']];
      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, heading);
      utils.sheet_add_json(ws, newUsers, {
        origin: 'A2',
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, 'Users');
      writeFile(wb, 'data.csv');
    }
    this.showModalExport = false;
  }
}
