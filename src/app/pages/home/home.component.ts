import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUser$;
  }
}
