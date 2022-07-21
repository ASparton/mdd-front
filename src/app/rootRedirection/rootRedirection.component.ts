import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiAuthService } from '../services/apiAuth.service';

@Component({
  selector: 'root-redirection',
  template: '',
  styleUrls: []
})
export class RootRedirectionComponent implements OnInit {
  constructor(private router: Router,
              private apiAuthService: ApiAuthService) {}

  /**
   * Redirect to login page if non auth, profile setup if mid auth, feed if full auth.
   */
  ngOnInit() {
    this.apiAuthService.isFullyAuthenticated()
    .then(isFullyAuth => isFullyAuth ? this.router.navigate(['/feed']) : this.router.navigate(['/profile-setup']))
    .catch(_ => this.router.navigate(['/internal-server-error']));
  }
}