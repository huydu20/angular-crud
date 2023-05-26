import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const fontAwesomeIcons = {
  search: faMagnifyingGlass,
  loading: faSpinner,
};

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  @Output() isSearching = new EventEmitter<boolean>();
  queryControl = new FormControl('');
  isLoading = false;
  icons = fontAwesomeIcons;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.queryControl.valueChanges
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.isSearching.emit(true);
        }),
        debounceTime(400),
        switchMap((value) => {
          if (!value) {
            this.isSearching.emit(false);
            console.log('emit: ', false);
          }
          return of(this.userService.filterUsers(value));
        }),
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
