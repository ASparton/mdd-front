import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {
  static readonly emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  isEmailValid(email: string): boolean {
    return InputValidationService.emailRegex.test(email);
  }

  isImageBlob(input: string): boolean {
    return input.startsWith('data:image/png') || input.startsWith('data:image/jpeg');
  }
}