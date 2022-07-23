import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiAuthService } from 'src/app/services/apiAuth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private apiAuthService: ApiAuthService) {}
  
  ngOnInit(): void {
      console.log('home');

    // Check if fully authenticated
    this.apiAuthService.isFullyAuthenticated()
      .then(isFullyAuth => !isFullyAuth && this.router.navigate(['/profile-setup']))
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }
}