import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/interfaces/login-model';
import { TokenModel } from 'src/app/interfaces/token-model';
import { UserModel } from 'src/app/interfaces/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = '';

  constructor(private _router: Router) {
    this.apiUrl = `${environment.APP_URL}users`;
  }

  async createUser(user: UserModel): Promise<TokenModel> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify(user),
    });
    let token: TokenModel = await response.json();
    localStorage.setItem('token', token.accessToken);

    return token;
  }

  async login(user: LoginModel): Promise<TokenModel> {
    const response = await fetch(`${this.apiUrl}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    let token: TokenModel = await response.json();
    localStorage.setItem('token', token.accessToken);

    return token;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
