import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StorageService } from '../service/storage.service';

import { version } from '../../../package.json';
import { fromEvent } from 'rxjs';
import { JsogService } from 'jsog-typescript';
import * as _ from 'lodash';
import { CommonService } from '../service/common.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    erpSearch = false;
    number = '';
    data: any = { valid: true };
    traceNumberRecords = [];
    batch: any = {};
    product: any = {};
    themeColor = '';
    company: any = {};
    companyParentName = '';
    message = '如果您是第一次查询,请联系经销商确认真伪!';
    activationState = true;
    protectionDateMessage = '';
    tabTitleScroll = false;
    tabTitleStyle = '';
    tabTitleStyles = ['', '', '', ''];
    batchInfos = [];
    traceRecords = [];
    scanRecords = [];
    btns = [];
    paddingBottom = '1px';
    batchInfoTitle = '溯源信息';
    version: string = version;
    timer: any;
    socketKeepAliveTimer: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private storageService: StorageService,
        private commonService: CommonService,
        private jsogService: JsogService
    ) {
        this.version = this.version + ' (API: ' + this.storageService.getAPIVersion() + ')';

        this.webSocketLiveMonitor();
    }

    ngOnInit(): void {
        console.info('version: ' + this.version);
        this.erpSearch = this.activatedRoute.snapshot.url[0].path == 'admin';
        this.number = this.activatedRoute.snapshot.paramMap.get('number');

        this.init();

        fromEvent(window, 'scroll').subscribe(() => {
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            if (top >= 200) {
                this.tabTitleScroll = true;
            } else {
                this.tabTitleScroll = false;
            }
        });
    }

    init() {

    }

    tabTitleClick(index: number) {
        if (index == 1) {
            this.tabTitleStyles = ['', this.tabTitleStyle, '', ''];
        } else if (index == 2) {
            this.tabTitleStyles = ['', '', this.tabTitleStyle, ''];
        } else if (index == 3) {
            this.tabTitleStyles = ['', '', '', this.tabTitleStyle];
        } else {
            this.tabTitleStyles = [this.tabTitleStyle, '', '', ''];
        }

        let tab = document.getElementById('tab' + index);
        document.documentElement.scrollTop = tab.offsetTop - 50;
        document.body.scrollTop = tab.offsetTop - 50;
    }

    // 获取扫码记录
    addTraceNumberRecord() {
        const param = {
            traceNumber: {
                id: this.data.id
            },
            province: '',
            city: '',
            district: '',
            address: '',
            longitude: 0,
            latitude: 0
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                param.longitude = position.coords.longitude;
                param.latitude = position.coords.latitude;
            });
        }

    }

    getRecords() {
        if (this.product.recordMessageEnable) {
            let recordMessageJson = [];

            // 1)优先获取批次上面的规则
            if (this.batch.recordMessageJson) {
                recordMessageJson = JSON.parse(this.batch?.recordMessageJson);
            }

            // 2)没有数据获取产品规则
            if (!recordMessageJson || recordMessageJson.length <= 0) {
                recordMessageJson = JSON.parse(this.product.recordMessageJson);
            }

            // 3)如果没有产品规则，使用默认规则
            if (!recordMessageJson || recordMessageJson.length <= 0) {
                recordMessageJson = [{ count: 1, message: '此产品是首次被认证!' }, { count: 2, message: '如果您是第一次查询，请联系经销商确认真伪！' }];
            }

            for (let i = 0; i < recordMessageJson.length; i++) {
                if (this.traceNumberRecords.length >= recordMessageJson[i].count) {
                    this.message = recordMessageJson[i].message;
                }
            }
        }

        let activationTime = new Date('2010-01-01');
        if (this.product.activationTime) {
            activationTime = new Date(this.product.activationTime);
        }

        console.info(this.traceNumberRecords);
        this.scanRecords = this.traceNumberRecords;
        this.scanRecords.filter((item) =>
            item.traceNumberStatus.id == 6 && new Date(item.createTime).getTime() > activationTime.getTime()
        );
        this.scanRecords = _.sortBy(this.scanRecords, (item) => {
            return -item.id;
        });
        //this.scanRecords = _.take(this.scanRecords, 10);
    }

    goMarketingLink(h: any) {
        window.location.href = h;
    }

    webSocketLiveMonitor() {
        const webSocket = new WebSocket(this.commonService.webSocketUrl + this.commonService.generateUUID());
        const that = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            console.info('timeout qrcode invalid');
            
            //webSocket.close();
        }, 60000)

        var socketState = 0;
        webSocket.onopen = () => {
            console.log('websocket连接成功');
            socketState = 1;
            clearInterval(that.socketKeepAliveTimer);
            that.socketKeepAliveTimer = setInterval(function () {
                console.info('socket keep alive: ' + socketState);
                if (socketState == 1) {
                    console.info('send ws ping')
                    webSocket.send('__ping__');
                    //that.qrcodeType = 2;
                }
            }, 15000)
        };

        webSocket.onmessage = (msg) => {
            console.log('websocket监听: ' + msg.data);

            try {
                const res = JSON.parse(msg.data);
                if (res) {
                    console.log(res)
                    
                }
            } catch (e) {
                console.log('返回json错误: ' + e);
            }
        };

        webSocket.onclose = () => {
            console.log('websocket onclose关闭');
            socketState = 0;
        };

        webSocket.onerror = (e) => {
            console.error('websocket onerror 错误: ' + e);
            // TODO 提示错误
            socketState = 2;
        };
    }
}
