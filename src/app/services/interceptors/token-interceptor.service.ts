import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {
  constructor(private _usersService: UsersService) {}
  
  intercept(req: any, next: any) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this._usersService.getToken(),
      },
    });
    return next.handle(tokenReq);
  }
}
