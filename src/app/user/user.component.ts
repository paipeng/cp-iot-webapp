import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { CommonService } from '../service/common.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User
  constructor(
    private storage: StorageService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    console.log(this.user);
  }

  logout() {
    console.info('logout');
    this.commonService.logout();
  }
}
