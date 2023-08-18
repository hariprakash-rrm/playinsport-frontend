import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from '../../admins/admin.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    FormsModule
} from '@angular/forms';

import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    errorMessage: string;
    UserForm: FormGroup;
    userName: string;
    phonenumber: any;
    wallet: number;
    txnHistory: any;
    showTransactionHistory: boolean = false;
    accessToken: string;
    isEditing: boolean = false;
    block: any
    totalSupply: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _adminService: AdminService,
        private _snackBar: SnackbarServiceService,
    ) {
        this.UserForm = this._formBuilder.group({
            searchName: new FormControl('', [Validators.minLength(6)]),
        });
    }

    ngOnInit(): void {
        this.accessToken = localStorage.getItem('accessToken');
    }

    get searchName() {
        return this.UserForm.get('searchName');
    }

    searchUser(): void {
        this.accessToken = localStorage.getItem('accessToken');

        const data = {
            username: this.UserForm.value.searchName,
            token: this.accessToken,
        };

        // console.log(this.accessToken);

        this.showTransactionHistory = false;

        this._adminService.getUser(data.username, data.token).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.errorMessage = '';
                    this.userName = response.data.username;
                    this.phonenumber = response.data.number;
                    this.wallet = response.data.wallet;
                    this.txnHistory = Object.values(response.data.txnHistory);
                    this.block = response.data.block
                }
                // console.log(this.txnHistory);
                this._snackBar.success(response.message, 4000);
            },
            (error) => {
                this._snackBar.error(error.error.message, 4000);
                this.userName = '';
                this.phonenumber = '',
                    this.wallet = null;
                this.txnHistory = '',
                    this.block = null;
            }
        );
    }

    updateData(): void { }

    toggleEdit(): void {
        if (!this.userName) {
            this._snackBar.error('User details cannot be empty', 4000);
            return;
        }
        this.isEditing = !this.isEditing;
        if (!this.isEditing) {
            const AccessToken = localStorage.getItem('accessToken');

            const updatedDetails = {
                username: this.userName,
                number: this.phonenumber,
                wallet: this.wallet,
                block: this.block,
                token: AccessToken,
            };
            this._adminService.updateUser(updatedDetails).subscribe(
                (response) => {
                    if (response.statusCode === 201) {
                        this.errorMessage = '';
                    }
                    this._snackBar.success(response.message, 4000);
                },
                (error) => {
                    this._snackBar.error(error.error.message, 4000);
                }
            );
        }
    }
    showTxnDetails(): void {
        if (!this.userName) {
            this._snackBar.error('User details cannot be empty', 3000);
            return;
        }
        this.showTransactionHistory = true;
    }
    showAllUser(): void {

        this._adminService.getAllUsers().subscribe(
            (response: any[]) => {
                this.errorMessage = '';
            },
            (error) => {
                this._snackBar.error(error.error.message, 4000);
            }
        );
    }


    exportToExcel() {
        let data={
            token : this.accessToken
        }
        this._adminService.exportToExcel(data).subscribe(
          (response: Blob) => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'user_details.xlsx';
            a.click();
          },
          (error) => {
            this._snackBar.error(error.error.message, 4000);
          }
        );
      }      
      showTnxHistory() {
        this.showTransactionHistory = true;
      }
      closeTransaction() {
        this.showTransactionHistory = false;
      }
      viewTotelsupply(){
        let data={
            token: this.accessToken
        }
        this._adminService.viewTotalSupply(data).subscribe(
            (response: any) => {
                this.totalSupply = response.data.data;
                console.log(response);
            },
            (error) => {
              this._snackBar.error(error.error.message, 4000);
            }
          );
      }
}
