import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagementRoutingModule } from './usermanagement-routing.module';
import { UsermanagementComponent } from './usermanagement.component';


@NgModule({
  declarations: [
    UsermanagementComponent
  ],
  imports: [
    CommonModule,
    UsermanagementRoutingModule
  ]
})
export class UsermanagementModule { }
