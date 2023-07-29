import { Component } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  data: any = {
    active: true,
    gender: 'Femenino',
  };
  action: string = '';
  id: string = '';

  constructor(
    private _employeesService: EmployeesService,
    private _utils: UtilsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this._activatedRoute.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.action = params["action"];
      this.id = params["id"];

      if(this.action == "update"){
        this._employeesService.getEmployee(this.id)
          .then((res) => {
            this.data = res;
            console.log(this.data);
          })
          .catch((err) => {
            this._utils.openSnackBarError("Ha ocurrido un error al obtener los datos del usuario")
          })
      }

      if(this.action == "delete"){
        this._employeesService.deleteEmployee(this.id)
        .then((res) => {
            if(res == true){
              this._utils.openSnackBarSuccesfull("Usuario eliminado exitosamente")
            } else {
              this._utils.openSnackBarError("Ha ocurrido un error al eliminar al usuario")
            }          
        })
        .catch((err) => {
          this._utils.openSnackBarError("Ha ocurrido un error al eliminar al usuario")
        });
      }
    });

  }

  createUser(){
    if(
      this.data.name &&
      this.data.lastName &&
      this.data.email &&
      this.data.salary &&
      this.data.age &&
      this.data.gender &&
      this.data.identification &&
      this.data.role &&
      this.data.yearsInCompany
    ){

      if(this.action == "update"){
        this._employeesService.updateEmployee(this.data, this.id)
          .then((res) => {
            this._utils.openSnackBarSuccesfull("Usuario registrado exitosamente")

            this.data = {
              active: true,
              gender: 'Femenino',
            };
          })
          .catch((err) => {
            this._utils.openSnackBarError("Ha ocurrido un error al registrar al usuario")
          });
      }
      else 
      {
        this._employeesService.createEmployee(this.data)
          .then((res) => {
            this._utils.openSnackBarSuccesfull("Usuario registrado exitosamente")

            this.data = {
              active: true,
              gender: 'Femenino',
            };
          })
          .catch((err) => {
            this._utils.openSnackBarError("Ha ocurrido un error al registrar al usuario")
          });
      }


    } else {
      this._utils.openSnackBarError("campos incompletos!")
    }
  }
}
