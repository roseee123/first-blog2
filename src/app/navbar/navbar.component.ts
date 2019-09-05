import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { User } from '../user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login$: Observable<boolean>;
  user$: Observable<User>;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit() {
    this.login$ = this.userService.getLoginStatus();
    this.user$ = this.userService.getCurrentUser();
    // this.login$ = of(true);
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
    // this.login$ = of(false);
  }

}
