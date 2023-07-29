import { Component } from '@angular/core';
import { EmployeesService } from '../../services/employees/employees.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { EmployeesModel } from 'src/app/interfaces/employees-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees: EmployeesModel[] = [];
  constructor(private _employeesService: EmployeesService,
    private _utilsService: UtilsService,
    private _router: Router) { }
    
  ngOnInit(): void {
    this._employeesService.getEmployees()
      .then((res) =>{
        this.employees = res;
        console.log(res);        
      })
      .catch((err) => {
        this._utilsService.openSnackBarError(err);
      });
  }

  deleteproduct(id: string){
    window.location.assign(`${document.baseURI}/employee?action=delete&id=${id}`);
  }

  updateproduct(id: string){
    window.location.assign(`${document.baseURI}/employee?action=update&id=${id}`);    
  }

}
