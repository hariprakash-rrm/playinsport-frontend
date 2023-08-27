import { Component, OnInit } from '@angular/core';
import { GameService } from './service/game.service';
import { ClassyLayoutComponent } from 'app/layout/layouts/vertical/classy/classy.component';
import { AnyKindOfDictionary } from 'lodash';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
    activeTab: 'deposit' | 'withdrawal' | 'txnHis' = 'deposit';
    depositTransactions: any = [];
    withdrawalTransactions: [] = [];
    newTab: 'deposit' | 'withdraw' = 'deposit'
    show: boolean;
    searchTransactionId: number;


    // For handling decline action
    showDeclineModal = false;
    selectedTransaction: any
    declineMessage = '';
    selectedTxn: any
    phonenumber: any;
    showPopup: boolean = false;
    isStatus: boolean = false;

    constructor(private gameService: GameService, private classy: ClassyLayoutComponent, private snack: SnackbarServiceService,
        private clipboard: Clipboard,
        private datePipe: DatePipe) {

    }

    ngOnInit(): void {
        this.getDepositData('pending')
        this.show = false;

    }

    switchTab(tab: 'deposit' | 'withdrawal' | 'txnHis') {
        this.withdrawalTransactions = [];
        this.depositTransactions = [];
        this.searchTransactionId = 0;
        this.activeTab = tab;
        this.show = false;
        if (this.activeTab == 'deposit') {
            this.getDepositData('pending')
        } else if (this.activeTab == 'withdrawal') {
            this.getWithdrawData('pending')
        }
        else {
            this.getDepositData('deposit')
        }
    }

    switchNewTab(tab: 'deposit' | 'withdraw') {
        this.withdrawalTransactions = [];
        this.depositTransactions = [];
        this.newTab = tab;
        this.show = true;
        if (this.newTab === 'deposit') {
            this.getDepositData('deposited');
        } 
        else {
            this.getWithdrawData('withdrawn');
        }
    }

    getDepositData(method: string) {
        let token = localStorage.getItem('accessToken')
        let data = {
            token: token,
            method: method
        }
        this.depositTransactions = []
        try {
            this.gameService.getDepositTransactions(data).subscribe((res: any) => {
                this.depositTransactions = res.data.data
                console.log(res.data.data);
            }, (error: any) => {
                this.snack.error(error.error.message, 4000)
            })
        }
        catch (error) {
            this.snack.error(error.error.message, 4000)
        }
    }

    getWithdrawData(method: string) {
        let token = localStorage.getItem('accessToken')
        let data = {
            token: token,
            method: method
        }
        this.withdrawalTransactions = []
        this.gameService.getWithdrawTransaction(data).subscribe((res: any) => {
            this.withdrawalTransactions = res.data.data
            console.log(res.data.data);

        }, (error: any) => {

            this.snack.error(error.error.message, 4000)            // console.log('resposnseeee', res)

        })
    }



    acceptTransactionForWithdraw() {
        this.showPopup = true;
        this.isStatus = true;
    }

    acceptTransaction(transaction: any, message: any) {
        // Implement accept logic here and update the transaction status
        let token = localStorage.getItem('accessToken')
        let number = this.classy.phonenumber
        this.isStatus = false;
        let data = {
            token: token,
            method: transaction.method,
            amount: transaction.amount,
            message: message,
            userPhoneNumber: transaction.userPhoneNumber
        }
        this.phonenumber = data.userPhoneNumber;
        this.updatePayment(data)

    }

    updatePayment(details: any) {
        console.log("**********", details);
        let { token, method, amount, message, userPhoneNumber } = details
        let data = {
            token: token,
            method: method,
            amount: amount,
            message: message,
            userPhoneNumber: userPhoneNumber
        }
        this.phonenumber = data.userPhoneNumber;
        try {
            this.gameService.updatePayment(data).subscribe((res: any) => {
                this.snack.success('success', 2000);
                if (this.activeTab == 'deposit') {
                    this.getDepositData('pending')

                }
                else if (this.activeTab == 'withdrawal') {
                    this.getWithdrawData('pending')
                }
                this.showDeclineModal = false;
            }, (error: any) => {

                console.log(error);
                this.snack.error(error.error.message, 4000)
            });
        } catch (error) {
            this.snack.error(error.error.message, 4000)
        }
    }

    declineTransaction(transaction: any, method: any) {
        console.log(method);
        this.showDeclineModal = true;
        this.selectedTransaction = transaction;


    }

    confirmDecline(transaction: any) {
        this.selectedTransaction.method = 'declineDeposit'
        let token = localStorage.getItem('accessToken')
        let number = this.classy.phonenumber
        let data = {
            token: token,
            method: this.selectedTransaction.method,
            amount: this.selectedTransaction.amount,
            message: this.declineMessage,
            userPhoneNumber: this.selectedTransaction.userPhoneNumber
        }
        console.log(this.selectedTransaction.method);
        this.phonenumber = data.userPhoneNumber;
        this.updatePayment(data)
    }

    closeModal() {
        this.showDeclineModal = false;
        this.declineMessage = ''
    }

    clickToCopy(number: any) {
        this.clipboard.copy(number);
    }

    closePopup() {
        this.showPopup = false;
    }
    status() {
        this.isStatus = true;
    }
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return this.datePipe.transform(date, 'MMM d, y, h:mm:ss a');
      }

      searchTransaction(method: string, transactionId: number){
        this.withdrawalTransactions = [];
        this.depositTransactions = [];
        let token = localStorage.getItem('accessToken')
        let data = {
            token: token,
            method: method,
            transactionId: transactionId
        }
        this.gameService.searchTransaction(data).subscribe((res: any) => {
            
            if(method === 'withdraw'){
                console.log(res.data.data);
                this.withdrawalTransactions = res.data.data
            }else{
                this.depositTransactions = res.data.data
            }
        }, (error: any) => {

            this.snack.error(error.error.message, 4000)          
        })
      }
}
