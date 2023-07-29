import { Injectable } from '@angular/core';
import { EmployeesModel } from 'src/app/interfaces/employees-model';
import { environment } from 'src/environments/environment';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  apiUrl: string = '';

  constructor(private _usersService: UsersService) {
    this.apiUrl = `${environment.APP_URL}employees`;
  }

  async getEmployees(): Promise<EmployeesModel[]> {
    const response = await fetch(this.apiUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._usersService.getToken(),
        },
      });
    return await response.json();
  }

  async getEmployee(id: string): Promise<EmployeesModel> {
    const response = await fetch(`${this.apiUrl}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._usersService.getToken(),
      },
    });
    return await response.json();
  }

  async createEmployee(employee: EmployeesModel): Promise<EmployeesModel> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._usersService.getToken(),
      },
      body: JSON.stringify(employee),
    });
    return await response.json();
  }

  async updateEmployee(employee: EmployeesModel, id: string): Promise<EmployeesModel> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._usersService.getToken(),
      },
      body: JSON.stringify(employee),
    });
    return await response.json();
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._usersService.getToken(),
      },
    });
    return await response.json();
  }
}
