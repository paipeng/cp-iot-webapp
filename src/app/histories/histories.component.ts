import { Component, OnInit } from '@angular/core';
import { Record } from '../model/record';
import { RecordService } from '../service/record.service';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit {
  public records: Array<Record>;

  constructor(
    private router: Router,
    private recordService: RecordService,
    private commonService: CommonService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.init();
  }


  init() {
    //this.commonService.openLoadingDialog();

    this.recordService.query().subscribe((res: any) => {
        console.log(res);
        this.records = _.sortBy(res, (item) => {
					return -item.id;
				});
        //this.commonService.closeLoadingDialog();
    }, (error) => {
        this.commonService.handleResponseError(error.status);
    });
  }

  getDevice(device) {
    console.info(device);
    this.router.navigate(['/device/' + device.id]);
  }

  getTypeName(recordType) {
    //console.info('getTypeName: ' + recordType);
    if (recordType === 1) {
      return this.translateService.instant('temperature')
    } else if (recordType === 2) {
      return this.translateService.instant('photosensitive')
    } else if (recordType === 3) {
      return this.translateService.instant('message_board')
    } else if (recordType === 6) {
      return this.translateService.instant('ping');
    }
  }
}
