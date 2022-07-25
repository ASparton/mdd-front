import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiAuthService } from 'src/app/services/apiAuth.service';
import { InputValidationService } from 'src/app/services/inputValidation.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private inputValidationService: InputValidationService,
              private apiService: ApiAuthService,
              private router: Router) {}

  // Inputs
  email: string = '';
  password: string = '';

  // Input validation
  invalidEmail: boolean = false;
  loginErrorMessage: string = '';

  /**
   * Check whether there is a missing fields or not in the form.
   * @returns true if there is at least one empty field, false otherwise.
   */
   checkMissingFields(): boolean {
    return this.email.length === 0 || this.password.length === 0;
  }

  /**
   * Check wheter the form inputs are valid (no missing fields, valid email).
   * @returns true if the form is valid, false otherwise.
   */
  formIsValid(): boolean {
    return !this.checkMissingFields() && !this.invalidEmail;
  }

  // Get input functions
  onEmailChange(newValue: string): void {
    this.email = newValue;
    this.invalidEmail = !this.inputValidationService.isEmailValid(this.email);
    if (this.loginErrorMessage.length > 0) this.loginErrorMessage = '';
  }
  onPasswordChange(newValue: string): void {
    this.password = newValue;
    if (this.loginErrorMessage.length > 0) this.loginErrorMessage = '';
  }

  /**
   * Try to log in the user with the given inputs.
   */
  onSubmit(): void {
    // Check form validity on front
    if (this.formIsValid()) {
      // Try to log in
      this.apiService.login(this.email, this.password)
        .then(response => {
          // If successful, store the auth token and go to the feed page
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['app/feed']);
        })
        .catch(error => {
          // Else check errors and indicate what is wrong to user
          if (error.response.status === 404 || error.response.status === 400) {
            this.loginErrorMessage = 'Wrong email or password'
          } else {
            this.router.navigate(['/internal-server-error']);
          }
        });
    }
  }
}