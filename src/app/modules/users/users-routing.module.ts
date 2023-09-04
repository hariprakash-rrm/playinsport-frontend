import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TokenComponent } from './components/token-component/token/token.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { HomeComponent } from './components/home-component/home/home.component';
import { RewardComponent } from './components/reward/reward.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'token',
    component: TokenComponent
  },

  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'reward',
    component: RewardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'transaction-history',
    component: TransactionHistoryComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
