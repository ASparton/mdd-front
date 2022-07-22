import { Component } from '@angular/core';

// Services
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/apiAuth.service';
import { InputValidationService } from 'src/app/services/inputValidation.service';

@Component({
  selector: 'register-form',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.css']
})
export class RegisterFormComponent {
  // Form inputs value
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Input validation
  invalidEmail: boolean = false;
  passwordsDifferent: boolean = false;
  usernameAvailable: boolean = true;
  emailAvailable: boolean = true;

  constructor(private router: Router,
              private inputValidationService: InputValidationService,
              private apiService: ApiAuthService) {}

  // Input validation functions

  /**
   * Check whether there is a missing fields or not in the form.
   * @returns true if there is at least one empty field, false otherwise.
   */
  checkMissingFields(): boolean {
    return this.username.length === 0 || 
           this.email.length === 0 || 
           this.password.length === 0 || 
           this.confirmPassword.length === 0;
  }

  /**
   * Check wheter the form inputs are valid (no missing fields, username available, same passwords...).
   * @returns true if the form is valid, false otherwise.
   */
  formIsValid(): boolean {
    return !this.checkMissingFields() && !this.invalidEmail && !this.passwordsDifferent;
  }

  // Get input functions
  onUsernameChange(newValue: string): void {
    this.username = newValue;
    this.checkMissingFields();
  }
  onEmailChange(newValue: string): void {
    this.email = newValue;
    this.invalidEmail = !this.inputValidationService.isEmailValid(this.email);
    this.checkMissingFields();
  }
  onPasswordChange(newValue: string): void { 
    this.password = newValue;
    this.checkMissingFields();
  }
  onConfirmPasswordChange(newValue: string): void {
    this.confirmPassword = newValue;
    this.passwordsDifferent = this.confirmPassword !== this.password;
    this.checkMissingFields();
  }

  /**
   * If the form front-end is valid, check if username & email are available, then register the user.
   */
  onSubmit(): void {
    if (this.formIsValid()) {
      this.apiService.areUserIdsAvailable(this.username, this.email)
        .then((response) => {
          this.usernameAvailable = response.data.username === 1;
          this.emailAvailable = response.data.email === 1; 
          if (this.usernameAvailable && this.emailAvailable)
            this.registerUser();
        })
        .catch(error => { console.log(error); this.router.navigate(['/internal-server-error']); });
    }
  }

  /**
   * Add the user to the db. If the operation is successful, redirect to profile setup with the user id.
   */
  private registerUser(): void {
    this.apiService.register(this.username, this.email, this.password)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/profile-setup']);
      })
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }
}