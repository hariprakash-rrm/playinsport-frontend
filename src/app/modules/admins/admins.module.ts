import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { TokenComponent } from './token/token.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from './admin.service';
import { TokenService } from './token.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {  DatePipe } from '@angular/common';
import { QrCodeComponent } from './qr-code/qr-code.component';

@NgModule({
    declarations: [TokenComponent, GameComponent, HomeComponent, QrCodeComponent],
    imports: [
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        AdminsRoutingModule,
        MatIconModule,
    ],
    providers: [AdminService, TokenService, DatePipe],
})
export class AdminsModule {}
