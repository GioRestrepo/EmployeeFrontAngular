import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _usersService: UsersService, private _router: Router) {}

  canActivate(): boolean {
    if (!this._usersService.loggedIn()) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
