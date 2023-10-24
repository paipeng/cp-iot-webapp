import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';

import { StorageService } from './storage.service';

import { CommonService } from './common.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
    constructor(
        private storage: StorageService,
        private common: CommonService,
        private translateService: TranslateService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')
            });    
        } else {
            console.info('Cotnent-Type: ' + req.headers.get('Content-Type'));
        }

        if (this.storage.getToken()) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.storage.getToken())
            });
        }

        const isLogin = req.url.includes('/login');

        return next.handle(req).pipe(
            /*
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event.body);
                    if (event.status == 200 || event.status == 201) {
                        event = event.clone(
                            {
                                body: this.jsogService.deserialize(event.body)
                            }
                        );
                    }
                    
                }
                return event;
            }),
            */
            catchError((err: HttpErrorResponse) => this.handleErrorData(err, isLogin))
        );
    }

    private handleErrorData(event: HttpResponse<any> | HttpErrorResponse, isLogin: boolean): Observable<any> {
        console.info('handleErrorData: ' + event.status);
        switch (event.status) {
            case 0:
                this.common.closeLoadingDialog();
                this.common.logout()
                return of(event);
            case 401:
                if (!isLogin) {
                    this.common.closeLoadingDialog();
                    this.common.openMessageDialog(
                        {
                            title: this.translateService.instant('title_error'),
                            message: this.translateService.instant('response_status_401')
                        }
                    );
                    this.common.logout();
                    return of(event);
                }
                break;
            case 502:
                this.common.closeLoadingDialog();
                this.common.openMessageDialog2(
                    {
                        title: this.translateService.instant('title_error'),
                        message: this.translateService.instant('response_status_502')
                    }
                );
                break;
            default:
        }

        return throwError(event);
    }
}