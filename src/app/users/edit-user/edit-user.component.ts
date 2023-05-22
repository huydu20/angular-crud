import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user$!: Observable<User | null>;
  user!: User | null;
  editForm!: FormGroup;
  isSubmit = false;
  showAlert = false;
  isExisting = false;
  isSuccess = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.user$ = this.userService.getUserByID(id);
    this.user$.subscribe((user) => {
      this.user = user;
      this.editForm = this.fb.group({
        firstName: [user?.firstName, [Validators.required]],
        lastName: [user?.lastName, [Validators.required]],
        username: [user?.username, [Validators.required]],
        password: ['', [Validators.minLength(6)]],
      });
    });
  }

  editUserSubmit() {
    if (this.user) {
      this.isSubmit = true;

      if (this.editForm.invalid) {
        return;
      }

      const data = this.editForm.value;

      this.showAlert = true;
      this.isSuccess = true;

      if (data.password === '') {
        const newData = new User(this.user.id, data.username, this.user.password, data.firstName, data.lastName);
        this.userService.updateUser(this.user.id, newData);
      } else {
        const newData = new User(this.user.id, data.username, data.password, data.firstName, data.lastName);
        this.userService.updateUser(this.user.id, newData);
      }
    }
  }

  isEdited() {
    this.router.navigate(['users'])
  }
}
