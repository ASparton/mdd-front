import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiAuthService } from '../services/apiAuth.service';

@Component({
    selector: 'profile-setup',
    templateUrl: './profileSetup.component.html',
    styleUrls: []
})
export class ProfileSetupComponent implements OnInit {
  constructor(private router: Router,
              private apiAuthService: ApiAuthService) {}

  ngOnInit(): void {
    this.apiAuthService.isFullyAuthenticated()
      .then(isFullyAuthenticated => isFullyAuthenticated && this.router.navigate(['/feed']))
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }
}