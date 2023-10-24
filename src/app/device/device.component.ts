import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { DeviceService } from '../service/device.service';
import { Device } from '../model/device';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  public device: Device;
  public deviceName: String;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
    ) { 
      this.deviceName = '';
    }

  ngOnInit(): void {
    var deviceId = Number(this.activatedRoute.snapshot.paramMap.get('deviceId'));
    console.info('deviceId: ' + deviceId);

    this.getDevice(deviceId);

  }

  getDevice(deviceId) {
    this.deviceService.queryBy(deviceId).subscribe((res: Device) => {
      console.log(res);
      this.device = res;
      //this.commonService.closeLoadingDialog();
      this.deviceName = this.translateService.instant('device') + ': ' + this.device.name;

  }, (error) => {
      this.commonService.handleResponseError(error.status);
  });
  }
}
