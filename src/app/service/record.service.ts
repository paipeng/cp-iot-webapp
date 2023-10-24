import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Record } from '../model/record';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private common: CommonService,
    private http: HttpClient) { }

  query() : Observable<Record[]> {
    return this.http.get<Record[]>(this.common.api + '/records');
  }

  queryBy(recordId: number): Observable<Record> {
    return this.http.get<Record>(this.common.api + '/records/' + recordId);
  }

  queryByDeviceId(deviceId: number): Observable<Record[]> {
    return this.http.get<Record[]>(this.common.api + '/records/devices/' + deviceId);
  }
}
