import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
    name: string;
    prize: number;
    tokenPrice: number;
    date: Date;
    maximumTokenPerUser: number;
    totalTokenNumber: number;
    tokenForm: FormGroup;

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
         this.tokenForm = this._formBuilder.group({
             name: ['', Validators.required],
             prize: ['', Validators.required],
             tokenPrice: ['', Validators.required],
             date: ['', Validators.required],
             maximumTokenPerUser: ['', Validators.required],
             totalTokenNumber: ['', Validators.required],
         });
    }

    createToken(): void {
        // console.log(this.name);
        if (this.tokenForm.valid) {
            const tokenData = this.tokenForm.value;
            console.log(tokenData);
            // Perform further actions with the token data
        } else {
            // Handle form validation errors if needed
        }
    }
}
