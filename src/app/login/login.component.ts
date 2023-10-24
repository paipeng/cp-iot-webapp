import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../service/common.service';
import { StorageService } from '../service/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { version } from '../../../package.json';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    qrCodeLoginFlag = false;
    qrCodeUrl = '';
    loginModel: User = new User();
    passwordFlag = true;
    passwordImage = '../assets/images/password_hide.png';
    codeImage = '';
    shortMessageText = '获取验证码';
    shortMessageSecond = 60;
    saveUsername = false;
    saveMobilePhone = false;
    version: string = version;
    loginQRcodeImgDisplays: boolean = true;
    qrcodeType = 2;
    timer: any;
    socketKeepAliveTimer: any;
    codeTimer: any;
    codeInvalid: boolean = false;
    type: number = 0;


    constructor(
        private router: Router,
        private cookie: CookieService,
        private storage: StorageService,
        private common: CommonService,
        private loginService: LoginService
    ) {

    }

    ngOnInit() {
        console.log('version: ' + version);
        console.log('token: ' + this.storage.getToken());

        if (this.storage.getUser()) {
            this.router.navigate(['/home']);
        } else {
            this.getCode();

            const username = this.cookie.get('username');
            if (username) {
                this.loginModel.username = username;
                this.saveUsername = true;
            }

            const mobilePhone = this.cookie.get('mobilePhone');
            if (mobilePhone) {
                //this.loginModel.mobilePhone = mobilePhone;
                this.saveMobilePhone = true;
            }
        }

        this.common.version().subscribe((res: any) => {
            console.info(res);
            this.storage.setAPIVersion(res.version);
            this.version = this.version + ' (API: ' + res.version + ')';
        }, (error) => {
            console.error(error);
        });
    }

    changePasswordFlag() {
        this.passwordFlag = !this.passwordFlag;
        if (this.passwordFlag) {
            this.passwordImage = '../assets/images/password_hide.png';
        } else {
            this.passwordImage = '../assets/images/password_show.png';
        }
    }

    changeQrCodeLoginFlag(flag: boolean) {
        this.qrCodeLoginFlag = flag;
        if (flag) {
            // change to App QR scan login mode
            
        } else {
            // change to username+password or mobilephone login mode
            this.loginQRcodeImgDisplays = true;
            this.qrcodeType = 2;
            clearInterval(this.socketKeepAliveTimer);
            clearInterval(this.timer);
        }
    }

    getCode() {
      /*
        this.loginService.getCode().subscribe((res: any) => {
            this.codeImage = res.codeImage;
            this.codeInvalid = false;
            clearInterval(this.codeTimer);
            this.codeTimer = setInterval(() => {
                console.info('code invalid');
                this.codeInvalid = true;
            }, 55000);
        }, (error) => {
            console.log(error);
        });
        */
    }

    getSmsCode() {
      /*
        let mobilePhone = this.loginModel.mobilePhone;

        if (!mobilePhone) {
            this.common.openMessageDialog({ title: '失败', message: '请填写手机号' });
            return;
        }

        if (!this.common.mobilePhoneReg.test(mobilePhone)) {
            this.common.openMessageDialog({ title: '失败', message: '手机号不正确' });
            return;
        }

        if (!this.loginModel.code) {
            this.common.openMessageDialog({ title: '失败', message: '请填写图形验证码' });
            return;
        }

        if (this.shortMessageSecond != 60) {
            return;
        }

        clearInterval(this.codeTimer);
        */
    }

    


    checkUsername(event: any) {
        let value = event.target.value;
        value = value.replace(/[\u4e00-\u9fa5]/ig, '');
        this.loginModel.username = value;
    }

    checkMobilePhone(event: any) {
        let value = event.target.value;
        value = value.replace(/[\u4e00-\u9fa5]/ig, '');
        //this.loginModel.mobilePhone = value;
    }

    checkPassword(event: any) {
        let value = event.target.value;
        value = value.replace(/[\u4e00-\u9fa5]/ig, '');
        this.loginModel.password = value;
    }

    checkCode(event: any) {
        let value = event.target.value;
        value = value.replace(/[\u4e00-\u9fa5]/ig, '');
        //this.loginModel.code = value;
    }

    checkSmsCode(event: any) {
        let value = event.target.value;
        value = value.replace(/[\u4e00-\u9fa5]/ig, '');
        //this.loginModel.smsCode = value;
    }

    login() {
        let param = new User();
        //param.keepLogin = this.loginModel.keepLogin;

        if (this.type == 0) {
            param.username = this.loginModel.username;
            param.password = this.loginModel.password;

            if (!param.username) {
                this.common.openMessageDialog({ title: '失败', message: '请填写用户名' });
                return;
            }
            if (!this.common.usernameReg.test(param.username)) {
                //this.common.openMessageDialog({ title: '失败', message: '用户名由英文字母大小写+数字下划线组合(4-16)位' });
                //return;
            }

            if (!param.password) {
                this.common.openMessageDialog({ title: '失败', message: '请填写密码' });
                return;
            }
            if (!this.common.passwordReg.test(param.password)) {
                //this.common.openMessageDialog({ title: '失败', message: '密码由英文字母大小写+数字下划线组合(8-16)位' });
                //return;
            }
            /*
            if (!param.code) {
                this.common.openMessageDialog({ title: '失败', message: '请填写图形验证码' });
                return;
            } else if (param.code.length != 4) {
                this.common.openMessageDialog({ title: '失败', message: '图形验证码长度错误' });
                return;
            }
            param.code = param.code.toUpperCase();
            */
        } else if (this.type == 1) {
          /*
            if (!this.loginModel.mobilePhone) {
                this.common.openMessageDialog({ title: '失败', message: '请填写手机号' });
                return;
            }

            if (!this.common.mobilePhoneReg.test(this.loginModel.mobilePhone)) {
                this.common.openMessageDialog({ title: '失败', message: '手机号不正确' });
                return;
            }

            if (!this.loginModel.code) {
                this.common.openMessageDialog({ title: '失败', message: '请填写图形验证码' });
                return;
            } else if (this.loginModel.code.length != 4) {
                this.common.openMessageDialog({ title: '失败', message: '图形验证码长度错误' });
                return;
            }

            if (!this.loginModel.smsCode) {
                this.common.openMessageDialog({ title: '失败', message: '请填写短信验证码' });
                return;
            } else if (this.loginModel.smsCode.length != 4) {
                this.common.openMessageDialog({ title: '失败', message: '短信验证码长度错误' });
                return;
            }

            param.username = this.loginModel.mobilePhone;
            param.password = this.loginModel.smsCode;
            param.code = '';
            */
        }

        //this.common.openLoadingDialog();

        this.loginService.login(param).subscribe((res: any) => {
            this.checkChanged();
            console.info(res);
            this.storage.setToken(res.token, res);
            this.common.closeLoadingDialog();
            this.router.navigate(['/home']);
        }, (error) => {
            if (error.status == 401) {
                this.common.closeLoadingDialog();
                this.common.openMessageDialog({ title: '失败', message: '用户名或者密码错误' });
            } else {
                this.common.handleResponseError(error.status);
            }


            //this.loginModel.code = '';
            this.getCode();
        });
    }

    checkChanged() {
        if (this.saveUsername) {
            //this.loginModel.keepLogin = true;
            this.cookie.set('username', this.loginModel.username);
        } else {
            //this.loginModel.keepLogin = false;
            this.cookie.delete('username');
        }

        if (this.saveMobilePhone) {
            //this.loginModel.keepLogin = true;
            //this.cookie.set('mobilePhone', this.loginModel.mobilePhone);
        } else {
            //this.loginModel.keepLogin = false;
            this.cookie.delete('mobilePhone');
        }
    }

    keypress(event: any) {
        if (event.keyCode === 13) {
            this.login();
        }
    }

    goWebsite() {
        window.open('');
    }
}
