import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sideBarSubject: any = new BehaviorSubject<any>('close')
  constructor() { }

  changeSideBar() {
    let sideBar = this.sideBarSubject.value

    if (sideBar == 'close') {
      this.sideBarSubject.next('open')
    } else {
      this.sideBarSubject.next('close')
    }

  }

}
