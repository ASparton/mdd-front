import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private static readonly API_URL = 'http://localhost:3000/';

  constructor(private router: Router) {}

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

  /**
   * Check if the current user is fully authenticated or not, or redirect to logic pages if errors.
   * @returns a promise indicating if the user is fully authenticated or not.
   */
  public async isFullyAuthenticated(): Promise<boolean> {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return false;
    }
    
    try {
      const requestConfig: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      const response = await axios.get(ApiAuthService.API_URL + 'users/current', requestConfig);
      return response.data.displayedName.length > 0;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 500)
          this.router.navigate(['/internal-server-error']);
        else {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/internal-server-error']);
      }
      return false;
    }
  }
}