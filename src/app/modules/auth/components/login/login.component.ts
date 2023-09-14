import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Global } from '../../../../core/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _AuthenticationService: AuthenticationService,
    private toastr: ToastrService,
    private globals: Global,
    private router: Router,
  ) {
    this.loginForm = this.createLoginForm();

  }

  ngOnInit() {
  }

  createLoginForm() {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {

      if (this.loginForm.get('username')?.value == 'admin' && this.loginForm.get('password')?.value == 'admin') {
        this.configUserData('admin')
      } else if (this.loginForm.get('username')?.value == 'user' && this.loginForm.get('password')?.value == 'user') {
        this.configUserData('user')
      } else {
        this.toastr.error('ليس لديك صلاحية الدخول');
      }

    }
  }



  configUserData(userRole: string) {
    let data = {
      userName: userRole,
      userRole: userRole
    }
    let token = 'store-app'
    localStorage.setItem('store-app-token', token);
    localStorage.setItem('store-app-currentUser', JSON.stringify(data));
    let user: any = localStorage.getItem('store-app-currentUser');
    this.globals.currentUser = JSON.parse(user);
    this.toastr.success('تم تسجيل الدخول بنجاع');
    this.router.navigate(['/']);
  }

}
