import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { DeviceService } from '../service/device.service';
import { Device } from '../model/device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public devices: Array<Device>;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private deviceService: DeviceService,
    ) { }

  ngOnInit(): void {
    this.init();
  }


  init() {
    //this.commonService.openLoadingDialog();

    this.deviceService.query().subscribe((res: any) => {
        console.log(res);
        this.devices = res;
        //this.commonService.closeLoadingDialog();
    }, (error) => {
        this.commonService.handleResponseError(error.status);
    });
  }

  getDevice(device) {
    console.info(device);
    this.router.navigate(['/device/' + device.id]);
  }

}
