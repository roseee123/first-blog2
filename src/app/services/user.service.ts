import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';
import { Response } from '../response';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginStatus = new BehaviorSubject<boolean>(false);
  currentUser = new BehaviorSubject<User>(null);
  private articleUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  loginServer(loginData): Observable<Response> {
    const userid = loginData.userid.trim();
    const password = loginData.password.trim();
    const url = `${this.articleUrl}/auth/login`;
    return this.http.post<Response>(url, { userid, password });
  }

  login(loginData): Observable<boolean> {
    return this.loginServer(loginData).pipe(
      map((res: Response) => {
        if (res.status) {
          this.loginStatus.next(true);
          this.currentUser.next(loginData.userid);
          this.utils.writeToken(res.token);
          return true;
        } else {
          console.log('can not login');
          return false;
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('client-side error');
          } else {
            console.log('server-side error');
          }
          return of(false);
        })
    );
  }

  logout() {
    this.loginStatus.next(false);
    this.currentUser.next(null);
    this.utils.removeToken();
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  checkUser(): Observable<boolean> {
    if (!this.utils.isTokenExpired()) {
      this.loginStatus.next(true);
      return of(true);
    } else {
      console.log('no token or token is expired');
      this.utils.removeToken();
      return of(false);
    }
  }
}
