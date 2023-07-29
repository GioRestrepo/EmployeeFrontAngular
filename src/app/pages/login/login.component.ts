import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/interfaces/login-model';
import { UsersService } from 'src/app/services/users/users.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: LoginModel = {
    email: '',
    password: ''
  };

  constructor(
    private _usersService: UsersService,
    private _utils: UtilsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  loggear(){
    if(this.data.email && this.data.password){
      this._usersService.login(this.data)
        .then((res) => {
          this._router.navigate(['/employees']);
          this._utils.openSnackBarSuccesfull("login exitoso!")
        })
        .catch((err) => {
          this._utils.openSnackBarError("Usuario o contraseña incorrectos");
        })
    } else {
      this._utils.openSnackBarError("todos los campos son obligatorios");
    }
  }
}
