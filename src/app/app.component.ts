import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchDataFromLocalStorage();
    this.user$ = this.userService.currentUser$;
  }

  logout() {
    this.userService.logout();
  }
}
