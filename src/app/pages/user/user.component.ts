import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/interfaces/user-model';
import { UsersService } from 'src/app/services/users/users.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  data: UserModel = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private _usersService: UsersService, private _router: Router, private _utils: UtilsService) { }

  register(){
    if(this.data.name && this.data.email && this.data.password){
      this._usersService.createUser(this.data)
        .then((res) => {
          console.log(res);
          this._router.navigate(['/employees']);
          this._utils.openSnackBarSuccesfull("usuario creado!")
        })
        .catch((err) => {
          this._utils.openSnackBarError("error al crear usuario");
        });
    }
  }
}
