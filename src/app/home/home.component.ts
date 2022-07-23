import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Primeng utils
import { MenuItem } from 'primeng/api';

// Services
import { ApiAuthService } from 'src/app/services/apiAuth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private apiAuthService: ApiAuthService) {}

  userMenu: MenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      command: _ => this.router.navigate(['/app/account'])
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: _ => this.apiAuthService.logout()
    }
  ];
  
  ngOnInit(): void {
    // Check if fully authenticated
    this.apiAuthService.isFullyAuthenticated()
      .then(isFullyAuth => !isFullyAuth && this.router.navigate(['/profile-setup']))
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }
}