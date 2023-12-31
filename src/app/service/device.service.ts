import { Injectable } from '@angular/core';

import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Device } from '../model/device';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private common: CommonService,
    private http: HttpClient) { }

  query() : Observable<Device[]> {
    return this.http.get<Device[]>(this.common.api + '/devices');
  }
  queryBy(deviceId: number): Observable<Device> {
    return this.http.get<Device>(this.common.api + '/devices/' + deviceId);

  }

  updateLedState(deviceId: number, state: number): Observable<Device> {
    return this.http.get<Device>(this.common.api + '/devices/' + deviceId + '/led/' + state);

  }
}
