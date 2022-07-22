import { Injectable } from '@angular/core';
import axios from 'axios';

// Types
import { UpdateUserQuery } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private static readonly API_URL = 'http://localhost:3000/';

  /**
   * Update given fields for the current logged in user.
   * @param updates all the fields to update
   * @returns an error message or the axios response or error
   */
  public updateUser(updates: UpdateUserQuery) {
    // Build query options
    const queryOptions = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`} };

    // Send query
    return axios.patch(ApiUserService.API_URL + 'users', { updates: updates }, queryOptions);
  }
}