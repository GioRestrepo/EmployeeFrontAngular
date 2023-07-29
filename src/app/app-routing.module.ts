import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeComponent } from './pages/employee/employee.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path:'employees',
    component: EmployeesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path:'employee',
    component: EmployeeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
