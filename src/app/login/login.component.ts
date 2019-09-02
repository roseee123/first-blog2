import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userid: ['', Validators.pattern('^[a-zA-Z0-9-_]')],
      password: ['', Validators.pattern('^[a-zA-Z0-9-_]')]
    });
  }
  get userid() {
    return this.form.get('userid');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    this.userService.login(this.form.value)
    .subscribe(res => {
      if (res) {
        this.snackbar.open('登入成功', 'OK', { duration: 3000});
      } else {
        this.snackbar.open('請檢查輸入', 'OK', {duration: 3000});
      }
    });
  }


}
