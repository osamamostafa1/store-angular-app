import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../core/global';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private globals: Global, private router: Router) { }

  login(model: any) {

  }

  LoggedIn() {
    const token = localStorage.getItem('store-app-token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('store-app-token');
    localStorage.removeItem('store-app-currentUser');
    this.globals.currentUser = '';
    this.router.navigate(['/login']);
  }
}
