import { Component, OnInit } from '@angular/core';
import { GameService } from './service/game.service';
import { ClassyLayoutComponent } from 'app/layout/layouts/vertical/classy/classy.component';
import { AnyKindOfDictionary } from 'lodash';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
    activeTab: 'deposit' | 'withdrawal' = 'deposit';
    depositTransactions: any = [];
    withdrawalTransactions: [] = [];

    // For handling decline action
    showDeclineModal = false;
    selectedTransaction: any
    declineMessage = '';
    selectedTxn: any
    phonenumber: any;
    showPopup: boolean = false;
    isStatus: boolean = false;

    constructor(private gameService: GameService, private classy: ClassyLayoutComponent, private snack: SnackbarServiceService,
        private clipboard: Clipboard) {

    }

    ngOnInit(): void {
        this.getDepositData()

    }

    switchTab(tab: 'deposit' | 'withdrawal') {
        this.activeTab = tab;
        if (this.activeTab == 'deposit') {
            this.getDepositData()
        } else {
            this.getWithdrawData()
        }
    }

    getDepositData() {
        let token = localStorage.getItem('accessToken')
        let data = {
            token: token,
            method: "pending"
        }
        this.depositTransactions = []
        try {
            this.gameService.getDepositTransactions(data).subscribe((res: any) => {
                this.depositTransactions = res.data.data
            }, (error: any) => {

                this.snack.error(error.error.message, 4000)
            })
        }
        catch (error) {
            this.snack.error(error.error.message, 4000)
        }
    }

    getWithdrawData() {
        let token = localStorage.getItem('accessToken')
        let data = {
            token: token,
            method: "pending"
        }
        this.withdrawalTransactions = []
        this.gameService.getWithdrawTransaction(data).subscribe((res: any) => {
            this.withdrawalTransactions = res.data.data
        }, (error: any) => {

            this.snack.error(error.error.message, 4000)            // console.log('resposnseeee', res)

        })
    }

    acceptTransactionForWithdraw(){
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
                    this.getDepositData()

                }
                else if (this.activeTab == 'withdrawal') {
                    this.getWithdrawData()
                }
                this.showDeclineModal = false;
            }, (error: any) => {

                this.snack.error(error.error.message, 4000)
            });
        } catch (error) {
            this.snack.error(error.error.message, 4000)
        }
    }

    declineTransaction(transaction: any, method: any) {
        this.showDeclineModal = true;
        this.selectedTransaction = transaction;
        this.selectedTransaction.method = method

    }

    confirmDecline(transaction: any) {

        let token = localStorage.getItem('accessToken')
        let number = this.classy.phonenumber
        let data = {
            token: token,
            method: this.selectedTransaction.method,
            amount: this.selectedTransaction.amount,
            message: this.declineMessage,
            userPhoneNumber: number
        }
        this.phonenumber = data.userPhoneNumber;
        this.updatePayment(data)
    }

    closeModal() {
        this.showDeclineModal = false;
        this.declineMessage = ''
    }

    clickToCopy(number: any){
        this.clipboard.copy(number);
    }

    closePopup(){
        this.showPopup = false;
    }
    status(){
        this.isStatus = true;
    }
}
