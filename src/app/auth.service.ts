import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './pkg/post';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'https://myreddit-backend.herokuapp.com/api/register';
  // loginUrl = 'https://myreddit-backend.herokuapp.com/api/login';
  loginUrl = '/api/login';
  helper = new JwtHelperService();

  private userId: BehaviorSubject<string>;

  constructor(private router: Router, private http: HttpClient) {
    this.userId = new BehaviorSubject<string>(localStorage.getItem('id') || '');
  }

  setUserId(id: string) {
    this.userId.next(id);
  }

  getUserId(): Observable<string> {
    return this.userId.asObservable();
  }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token') || '';
    const isExpired = this.helper.isTokenExpired(token);
    return !isExpired;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
