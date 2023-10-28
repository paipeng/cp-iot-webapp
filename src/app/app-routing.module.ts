import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DeviceComponent } from './device/device.component';
import { DevicesComponent } from './devices/devices.component';
import { PagerComponent } from './pager/pager.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'device/:deviceId', component: DeviceComponent },
    { path: 'devices', component: DevicesComponent },
    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'pager/:pagerUUID', component: PagerComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}