import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly API_URL = 'http://localhost:3000/';

  public areUserIdsAvailable(username: string, email: string) {
    return axios.get(ApiService.API_URL + 'users/availability?username=' + username + '&email=' + email);
  }

  /**
   * Call the intern API to register a new user with the given information.
   * @param username the username
   * @param email the user email
   * @param password the user password
   */
  public registerUser(username: string, email: string, password: string) {
    return axios.post(ApiService.API_URL + 'users', {
      username: username,
      email: email,
      password: password
    });
  }
}