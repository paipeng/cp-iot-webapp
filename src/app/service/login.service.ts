import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private common: CommonService,
    private http: HttpClient
  ) { }

  login(login: User) {
    return this.http.post(this.common.api + '/login', login);
  }

  getCode() {
    return this.http.get(this.common.api + '/login/code');
  }
}
