import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { LoadingComponent } from '../dialog/loading/loading.component';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageComponent } from '../dialog/message/message.component';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	public baseHref = '';
	public api: string;
	public upload: string;
	private loadingDialog: MatDialogRef<LoadingComponent>;

    public usernameReg = /^(?=.*[A-Za-z])[A-Za-z0-9_]{4,16}$/;
    public passwordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9_]{8,16}$/;
    public mobilePhoneReg = /^1\d{10}$/;
    public emailReg = /^\S+@\S+.\S+$/;

    public webSocketUrl = 'ws://192.168.1.228/wss/websocket/live/';

	constructor(
        private http: HttpClient,
        private dialog: MatDialog,
		private locationStrategy: LocationStrategy,
        private storage: StorageService,
        private router: Router,
        private translate: TranslateService
	) {
		this.baseHref = this.locationStrategy.getBaseHref();
		this.api = this.baseHref + 'api';
		this.upload = '';
	}

	// 时间转换
	timestampToDate(time: any, flag: number) {
		if (time) {
			time = new Date(time);
		} else {
			time = new Date();
		}

		const year = (time.getFullYear()).toString();
		let month = (time.getMonth() + 1).toString();
		let day = (time.getDate()).toString();
		let hour = (time.getHours()).toString();
		let minutes = (time.getMinutes()).toString();
		let seconds = (time.getSeconds()).toString();

		month = month.length < 2 ? '0' + month : month;
		day = day.length < 2 ? '0' + day : day;
		hour = hour.length < 2 ? '0' + hour : hour;
		minutes = minutes.length < 2 ? '0' + minutes : minutes;
		seconds = seconds.length < 2 ? '0' + seconds : seconds;

		if (flag === 0) {
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		} if (flag === 1) {
			return year + '-' + month + '-' + day + ' 00:00:00';
		} else if (flag === 2) {
			return year + '-' + month + '-' + day;
		} else {
			return '';
		}
	}


    openLoadingDialog() {
        this.loadingDialog = this.dialog.open(LoadingComponent, {
            disableClose: true
        });
    }

    closeLoadingDialog() {
        if (this.loadingDialog) {
            this.loadingDialog.close();
        }
    }


    // 消息窗口
    openMessageDialog(data: object) {
        this.dialog.closeAll();
        setTimeout(() => {
            this.dialog.open(MessageComponent, {
                data: data
            });
        });

        setTimeout(() => {
            this.dialog.closeAll();
        }, 2000);
    }

	version() {
        return this.http.get(this.api + '/version');
    }


    handleResponseError(status: number) {
        this.closeLoadingDialog();
        var dialog_message = {
            title: this.translate.instant('message_error_title'),
            message: null
        }
        if (status === 400) {
            dialog_message.message = this.translate.instant('response_status_400');
        } else if (status === 401) {
            dialog_message.message = this.translate.instant('response_status_401');
        } else if (status === 403) {
            dialog_message.message = this.translate.instant('response_status_403');
        } else if (status === 404) {
            dialog_message.message = this.translate.instant('response_status_404');
        } else if (status === 406) {
            dialog_message.message = this.translate.instant('response_status_406');
        } else if (status === 409) {
            dialog_message.message = this.translate.instant('response_status_409');
        } else if (status == 421) {
            dialog_message.message = this.translate.instant('response_status_421');
        } else if (status == 422) {
            dialog_message.message = this.translate.instant('response_status_422');
        } else if (status == 423) {
            dialog_message.message = this.translate.instant('response_status_423');
        } else if (status == 499) {
            dialog_message.message = this.translate.instant('response_status_499');
        } else if (status === 567) {
            dialog_message.message = this.translate.instant('response_status_567');
        } else if (status === 568) {
            dialog_message.message = this.translate.instant('response_status_568');
        } else if (status === 569) {
            dialog_message.message = this.translate.instant('response_status_569');
        } else {
            dialog_message.message = this.translate.instant('response_status_500');
        }
        this.openMessageDialog(dialog_message);

        return dialog_message;
    }

	openMessageDialog2(data: object) {
        this.dialog.closeAll();
        this.dialog.open(MessageComponent, {
            data: data
        });
    }
	
    logout() {
        this.storage.logout();
        this.router.navigate(['/login']);
    }

    generateUUID(): string {
        const stringArr = [];
        for (let i = 0; i < 4; i++) {
            // tslint:disable-next-line:no-bitwise
            const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            stringArr.push(S4);
        }
        return stringArr.join('-');
    }

    getTypeName(recordType) {
        //console.info('getTypeName: ' + recordType);
        if (recordType === 1) {
          return this.translate.instant('temperature')
        } else if (recordType === 2) {
          return this.translate.instant('photosensitive')
        } else if (recordType === 3) {
          return this.translate.instant('message_board')
        } else if (recordType === 6) {
          return this.translate.instant('ping');
        } else if (recordType === 7) {
            return this.translate.instant('led');
          }
      }
}
