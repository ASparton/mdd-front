import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonInputValidationService {
  static readonly emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  isEmailValid(email: string): boolean {
    return CommonInputValidationService.emailRegex.test(email);
  }
}