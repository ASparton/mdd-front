import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {
  static readonly emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  static readonly usernameRegex: RegExp = /^[a-z0-9_-]{3,35}$/;
  static readonly passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  static readonly displayedNameRegex: RegExp = /^[a-zA-Z0-9_-]+(?:\s[a-zA-Z0-9_-]+)?$/;

  /**
   * @param email the email to validate
   * @returns true if the email is valid, false otherwise
   */
  isEmailValid(email: string): boolean {
    return InputValidationService.emailRegex.test(email);
  }

  /**
   * @param username the username to validate
   * @returns true if the username is valid, false otherwise
   */
  isUsernameValid(username: string): boolean {
    return InputValidationService.usernameRegex.test(username);
  }

  /**
   * @param displayedName the displayed name to validate
   * @returns true if the displayed name is valid, false otherwise
   */
   isDisplayedNameValid(displayedName: string): boolean {
    return InputValidationService.displayedNameRegex.test(displayedName);
  }

  /**
   * @param password the password to validate
   * @returns true if the password is valid, false otherwise
   */
   isPasswordValid(password: string): boolean {
    return InputValidationService.passwordRegex.test(password);
  }

  /**
   * @param input blob as string to validate
   * @returns true if it is a blob image, false otherwise
   */
  isImageBlob(input: string): boolean {
    return input.startsWith('data:image/png') || input.startsWith('data:image/jpeg');
  }
}