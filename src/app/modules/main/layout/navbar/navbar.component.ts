import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Global } from '../../../../core/global';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  language = 'عربي'
  profile: any
  baseUrlImg = environment.baseUrl + 'attachment/load';
  image: any = 'assets/image/person.jpg';
  userRole: any
  constructor(
    private _auth: AuthenticationService,
    public _translate: TranslateService,
    public _global: Global,
  ) {

  }


  ngOnInit() {
    if (localStorage.getItem('lang') == 'ar') {
      this.language = 'english'
    } else {
      this.language = 'arabic'
    }
    this.userRole = this._global?.currentUser?.userRole
  }


  changeLanguage() {
    if (localStorage.getItem('lang') == 'ar') {
      localStorage.setItem('lang', 'en')
      this._translate.use('en');
      this.language = 'arabic'
    }
    else if (localStorage.getItem('lang') == 'en') {
      localStorage.setItem('lang', 'ar')
      this._translate.use('ar');
      this.language = 'english'
    }

    document.querySelector('body')!.setAttribute('dir', localStorage.getItem('lang') == 'ar' ? 'rtl' : 'ltr');
    document.querySelector('html')!.setAttribute('lang', localStorage.getItem('lang') == 'ar' ? 'ar' : 'en');

  }




  logout() {
    this._auth.logout()
  }


}
