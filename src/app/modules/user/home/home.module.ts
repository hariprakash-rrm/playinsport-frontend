import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoute } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SocketIoModule } from 'ngx-socket-io';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    IvyCarouselModule,
    CommonModule,
    SocketIoModule.forRoot({ url: environment.apiUrl, options: {} }),
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(HomeRoute),
  ]
})
export class HomeModule { }
