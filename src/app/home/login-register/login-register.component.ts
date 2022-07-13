import { Component, OnInit } from '@angular/core';

// Primeng
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  tabs: MenuItem[] = [
    {label: 'Log in'},
    {label: 'Register'},
  ];
}