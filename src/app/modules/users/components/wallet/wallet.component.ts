import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  username: string = 'JohnDoe';
  activeTab: string = 'deposit';
  mobileNumber: string = '';
  transactionId: string = '';
  withdrawNumber: string = '';
  withdrawAmount: string = '';
  amount: number;
  constructor() { }

  ngOnInit(): void {
  }

 

  handleFileInput(event: any) {
    // Handle file input logic here
  }

  submitDeposit() {
    // Handle deposit submission logic here
  }

  submitWithdraw() {
    // Handle withdraw submission logic here
  }

}
