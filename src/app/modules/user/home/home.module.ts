import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoute } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SocketIoModule } from 'ngx-socket-io';
import {IvyCarouselModule} from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    IvyCarouselModule,
    CommonModule,
    SocketIoModule.forRoot({ url: 'https://d1d0-2401-4900-3601-781a-2e3-7fbf-7866-4096.ngrok-free.app', options: {} }),
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(HomeRoute),
  ]
})
export class HomeModule { }
