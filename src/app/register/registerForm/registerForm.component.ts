import { Component } from '@angular/core';
import { CommonInputValidationService } from 'src/app/commonInputValidation.service';

@Component({
  selector: 'register-form',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.css']
})
export class RegisterFormComponent {
  constructor(private inputValidationService: CommonInputValidationService) {}

  // Form inputs value
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Input validation
  usernameUnavailable: boolean = false;
  invalidEmail: boolean = false;
  passwordsDifferent: boolean = false;

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
    return !this.checkMissingFields() && !this.usernameUnavailable && !this.invalidEmail && !this.passwordsDifferent;
  }

  // Get input functions
  onUsernameChange(newValue: string): void {
    this.username = newValue;
    // TODO: Check username availability
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
    // TODO : Register user
  }
}