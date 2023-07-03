import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {
    FormBuilder,
    FormGroup,
    NgForm,
    Validators,
    FormControl,
} from '@angular/forms';

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

    constructor(
        private _formBuilder: FormBuilder,
        private _adminService: AdminService
    ) {
        this.UserForm = this._formBuilder.group({
            searchName: new FormControl('', [Validators.minLength(6)]),
        });
    }

    ngOnInit(): void {}

    get searchName() {
        return this.UserForm.get('searchName');
    }
    accessToken() {
        return localStorage.getItem('accessToken');
    }

    searchUser(): void {
        const data = {
            username: this.UserForm.value.searchName,
            token: this.accessToken(),
        };

        this._adminService.getUser(data.username, data.token).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.errorMessage = '';
                    this.userName = response.data.username;
                    this.phonenumber = response.data.number;
                    this.wallet = response.data.wallet;
                    this.txnHistory = response.data.txnHistory;
                }
            },
            (error) => {
                this.errorMessage = error.error.message;
            }
        );
    }
    // search(): void {}
}
