import { Component } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  static readonly emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Form inputs value
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Input validation
  missingFields: boolean = true;
  usernameUnavailable: boolean = false;
  invalidEmail: boolean = false;
  passwordsDifferent: boolean = false;

  /**
   * Check whether there is a missing fields or not in the form.
   */
  checkMissingFields(): void {
    this.missingFields = this.username.length === 0 || 
                         this.email.length === 0 || 
                         this.password.length === 0 || 
                         this.confirmPassword.length === 0;
  }

  /**
   * Check wheter the form inputs are valid (no missing fields, username available, same passwords...).
   * @returns true if the form is valid, false otherwise.
   */
  formIsValid(): boolean {
    return !this.missingFields && !this.usernameUnavailable && !this.invalidEmail && !this.passwordsDifferent;
  }

  // Get input functions
  onUsernameChange(newValue: string): void {
    this.username = newValue;
    // TODO: Check username availability
    this.checkMissingFields();
  }
  onEmailChange(newValue: string): void {
    this.email = newValue;
    this.invalidEmail = !RegisterComponent.emailRegex.test(this.email);
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
    // TODO : Register user
  }
}