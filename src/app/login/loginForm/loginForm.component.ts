import { Component } from '@angular/core';
import { CommonInputValidationService } from 'src/app/commonInputValidation.service';

@Component({
  selector: 'login-form',
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.css']
})
export class LoginFormComponent {
  constructor(private inputValidationService: CommonInputValidationService) {}

  // Inputs
  email: string = '';
  password: string = '';

  // Input validation
  invalidEmail: boolean = false;

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
  }
  onPasswordChange(newValue: string): void {
    this.password = newValue;
  }

  /**
   * Try to log in the user with the given inputs.
   */
  onSubmit(): void {
    console.log(this.email);
    console.log(this.password);
    // TODO: Log in logic
  }
}