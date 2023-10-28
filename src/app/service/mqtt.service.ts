import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { CPIOTPagerMessage } from '../model/cpiotpagermessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  
  constructor(
    private common: CommonService,
    private http: HttpClient) { }

  pagerValidateContactScanCode(uuid: string) : Observable<CPIOTPagerMessage> {
    return this.http.get<CPIOTPagerMessage>(this.common.api + '/mqtts/pager/' + uuid + '/validate');
  }
  
  sendPagerMessage(pagerMessage: CPIOTPagerMessage)  {
    return this.http.post(this.common.api + '/mqtts/pager', pagerMessage);
  }
}
