import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { JsogService } from 'jsog-typescript';
import { LoginComponent } from './login/login.component';
import { DeviceComponent } from './device/device.component';
import { DevicesComponent } from './devices/devices.component';
import { HistoriesComponent } from './histories/histories.component';
import { UserComponent } from './user/user.component';
import { UniversalInterceptor } from './service/universal.interceptor';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + Date.now());
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        DeviceComponent,
        DevicesComponent,
        HistoriesComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgxEchartsModule.forRoot({
            echarts
        }),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true },
        JsogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}