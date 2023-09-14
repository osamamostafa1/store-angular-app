import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Global } from '../app/core/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'store-angular-app';

  constructor(public translate: TranslateService,
    private global: Global,) {


    const curentuser = localStorage.getItem('store-app-currentUser');
    if (curentuser) {
      this.global.currentUser = JSON.parse(curentuser);
    }


    if (localStorage.getItem('lang') == 'ar') {
      translate.setDefaultLang('ar');
    } else if (localStorage.getItem('lang') == 'en') {
      translate.setDefaultLang('en');
    } else {
      localStorage.setItem('lang', 'en');
      translate.setDefaultLang('en');
    }

    let lang: any = localStorage.getItem('lang');
    document.querySelector('body')!.setAttribute('dir', lang == 'ar' ? 'rtl' : 'ltr');
    document.querySelector('html')!.setAttribute('lang', lang == 'ar' ? 'ar' : 'en');
  }
}
