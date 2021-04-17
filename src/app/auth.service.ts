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
  registerUrl = '/api/register';
  loginUrl = '/api/login';
  helper = new JwtHelperService();

  private userId: BehaviorSubject<string>;

  // private id: string = '';

  constructor(private router: Router, private http: HttpClient) {
    console.log('construction is called and: ', localStorage.getItem('id'));
    this.userId = new BehaviorSubject<string>(localStorage.getItem('id') || '');
  }

  setUserId(id: string) {
    this.userId.next(id);
  }

  getUserId(): Observable<string> {
    return this.userId.asObservable();
  }

  // getUserId(): string {
  //   return this.id;
  // }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    const url = '/posts';
    // this.router.navigate([url]);
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    //   this.router.navigate([url]));
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
