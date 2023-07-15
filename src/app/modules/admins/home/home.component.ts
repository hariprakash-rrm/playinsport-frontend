import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from '../../admins/admin.service';
import {
    FormBuilder,
    FormGroup,
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
    accessToken: string;
    isEditing: boolean = false;
    block: any

    constructor(
        private _formBuilder: FormBuilder,
        private _adminService: AdminService
    ) {
        this.UserForm = this._formBuilder.group({
            searchName: new FormControl('', [Validators.minLength(6)]),
        });
    }

    ngOnInit(): void { }

    get searchName() {
        return this.UserForm.get('searchName');
    }

    searchUser(): void {
        this.accessToken = localStorage.getItem('accessToken');

        const data = {
            username: this.UserForm.value.searchName,
            token: this.accessToken,
        };

        console.log(this.accessToken);

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
                console.log(this.txnHistory);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    updateData(): void { }

    toggleEdit(): void {
        this.isEditing = !this.isEditing;
        if (!this.isEditing) {
            const AccessToken = localStorage.getItem('accessToken');
            console.log(AccessToken);

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
                        //  this.isEditing = false;
                    }
                    console.log(this.txnHistory);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
