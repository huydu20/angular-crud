import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmit = false;
  showAlert = false;
  isExisting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerSubmit() {
    this.isSubmit = true;

    if (this.registerForm.invalid) {
      return;
    }
    const data = this.registerForm.value;
    console.log(data)

    if (!this.userService.addUser(data.username, data.password, data.firstName, data.lastName)) {
      this.showAlert = true;
      this.isExisting = true;
    } else {
      this.showAlert = true;
      this.isSuccess = true;
      this.isSubmit = false;
      this.registerForm.reset();
    }
  }
}
