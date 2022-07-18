import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private static readonly API_URL = 'http://localhost:3000/';

  /**
   * Call the internal API to know if the given username and email are valid or not.
   * @param username the username to check
   * @param email the email to check
   * @returns the object indicating if the username and email are available or not or error if the request failed
   */
  public areUserIdsAvailable(username: string, email: string) {
    return axios.get(ApiAuthService.API_URL + `users/availability?username=${username}&email=${email}`);
  }

  /**
   * Call the internal API to register a new user with the given information.
   * @param username the username
   * @param email the user email
   * @param password the user password
   * @returns the auth token or error if the request failed
   */
  public register(username: string, email: string, password: string) {
    return axios.post(ApiAuthService.API_URL + 'users', {
      username: username,
      email: email,
      password: password
    });
  }

  /**
   * Call the internal API to try to login the user with the given email and password.
   * @param email the user's email
   * @param password the user's password
   * @returns the auth token or error if the request failed
   */
  public login(email: string, password: string) {
    return axios.get(ApiAuthService.API_URL + `login?email=${email}&password=${password}`);
  }
}