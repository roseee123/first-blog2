import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
export const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  isTokenExpired(token: string = TOKEN): boolean {
    const jwtStr = this.getToken(token);
    if (jwtStr) {
      return this.jwtHelper.isTokenExpired(jwtStr);  // token expired?
    } else {
      return true;        // no token
    }
  }

  writeToken(value: string, token: string = TOKEN) {
    localStorage.setItem(token, value);
  }

  getToken(token: string = TOKEN) {
    return localStorage.getItem(token);
  }

  removeToken(token: string = TOKEN) {
    if (this.getToken(token)) {
      localStorage.removeItem(token);
    }
  }
}
