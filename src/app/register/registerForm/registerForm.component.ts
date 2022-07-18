import { Component } from '@angular/core';

// Services
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonInputValidationService } from 'src/app/services/commonInputValidation.service';

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
              private inputValidationService: CommonInputValidationService,
              private apiService: ApiService) {}

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

  // Form submit
  onSubmit(): void {
    if (this.formIsValid()) {
      this.apiService.areUserIdsAvailable(this.username, this.email)
        .then((response) => {
          this.usernameAvailable = response.data.username === 1;
          this.emailAvailable = response.data.email === 1; 
          if (this.usernameAvailable && this.emailAvailable)
            this.registerUser();
        })
        .catch(_ => this.router.navigate(['/internal-server-error']));
    }
  }

  private registerUser(): void {
    this.apiService.registerUser(this.username, this.email, this.password)
      .then(response => {
        console.log('User id: ' + response.data.insertedId);
        // TODO: Authenticate user & redirect to profile setup
      })
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }
}