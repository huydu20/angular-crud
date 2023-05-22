import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addForm!: FormGroup
  isSubmit = false
  showAlert = false
  isExisting = false
  isSuccess = false

  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  addUserSubmit() {
    this.isSubmit = true;

    if (this.addForm.invalid) {
      return;
    }
    const data = this.addForm.value;
    console.log(data)

    if (!this.userService.addUser(data.username, data.password, data.firstName, data.lastName)) {
      this.showAlert = true;
      this.isExisting = true;
      this.isSuccess = false;
    } else {
      this.showAlert = true;
      this.isExisting = false;
      this.isSuccess = true;
      this.isSubmit = false;
      this.addForm.reset();
    }
  }
}
