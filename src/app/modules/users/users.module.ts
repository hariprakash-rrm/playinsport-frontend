import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectTokenComponent } from './components/token-component/select-token/select-token.component';
import { TokenService } from './components/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { TokenComponent } from './components/token-component/token/token.component';
import { HomeComponent } from './components/home-component/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { WalletComponent } from './components/wallet/wallet.component';




@NgModule({
  declarations: [
    HomeComponent,
    TokenComponent,
    SelectTokenComponent,
    WalletComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule, FormsModule,
  ],
  providers: [TokenService],
})
export class UsersModule { }
