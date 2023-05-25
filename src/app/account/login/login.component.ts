import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmit = false;
  showAlert = false;
  currentUser!: User;

  constructor(private fb: FormBuilder, private userService: UserService, private storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.storageService.remove('currentUser');
  }

  loginSubmit() {
    this.isSubmit = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    if (!this.userService.login(data.username, data.password)) {
      this.showAlert = true;
      this.isSubmit = false;
      this.loginForm.reset();
    }
  }
}
