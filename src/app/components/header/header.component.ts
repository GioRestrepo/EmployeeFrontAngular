import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor() { }

  ngOnInit(): void {
  }
  tokenExist(){
    let token = localStorage.getItem("token");
    return token == undefined ? true : false;
  }
  out(){
    localStorage.removeItem('token');
  }
}
