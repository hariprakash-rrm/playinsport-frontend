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
import {MatSelectModule} from '@angular/material/select';
import { SlideshowComponent } from './components/home-component/slideshow/slideshow.component';
import { RewardComponent } from './components/reward/reward.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


@NgModule({
  declarations: [
    HomeComponent,
    TokenComponent,
    SelectTokenComponent,
    WalletComponent,
    SlideshowComponent,
    RewardComponent,
    ProfileComponent,
    TransactionHistoryComponent,
    TermsAndConditionsComponent,
    ContactUsComponent,
    
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, MatSelectModule
  ],
  providers: [TokenService],
})
export class UsersModule { }
