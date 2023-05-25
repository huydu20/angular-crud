import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const fontawesomeIcons = {
  search: faMagnifyingGlass,
  loading: faSpinner
}


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  queryControl = new FormControl('');
  isLoading = false
  icons = fontawesomeIcons


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.queryControl.valueChanges
      .pipe(
        tap(() => {
          this.isLoading = true
        }),
        debounceTime(400),
        switchMap((value) => {
          return of(this.userService.filterUsers(value));
        }),
        tap(() => {
          this.isLoading = false
        })
      )
      .subscribe();
  }
}
