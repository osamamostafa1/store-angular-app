import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Global } from '../../../../core/global';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  labelItem: string = ''
  show: string = 'inActive'
  userRole: any
  constructor(
    public _sideBarService: SidebarService,
    private _global: Global,
  ) { }

  ngOnInit() {
    this.userRole = this._global?.currentUser?.userRole
  }

  onToggleSideBar() {
    this._sideBarService.changeSideBar()
  }

  openMenu(label: string) {
    this._sideBarService.sideBarSubject.next('open')
    if (this.show == 'active' && label == this.labelItem) {
      this.show = 'inActive'
    } else {
      this.show = 'active'
    }
    this.labelItem = label
  }

  closeMenu() {
    this.show = 'inActive'
  }

}

