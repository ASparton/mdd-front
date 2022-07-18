import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private static readonly API_URL = 'http://localhost:3000/';

  public getUserById(id: string) {
    return axios.get(`/users/${id}`);
  }
}