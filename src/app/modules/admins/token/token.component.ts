import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-tokens',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
    tokenForm: FormGroup

    constructor(
        private tokenService: TokenService,
        private snackbarServiceService: SnackbarServiceService,
        private _formBuilder: FormBuilder
    ) {
        this.tokenForm = this._formBuilder.group({
            name: new FormControl('', [Validators.minLength(6)]),
            totalTokenNumber: new FormControl('', [Validators.required]),
            maximumTokenPerUser: new FormControl('', [Validators.required]),
            date: new FormControl('', Validators.required),
            tokenPrice: new FormControl('', Validators.required),
            prize: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {}

    tokenCreation(): void {
        const accessToken = localStorage.getItem('accessToken');
        const valuesArray: string[] = this.tokenForm.value.prize.split(',');
        const data = {
            name: this.tokenForm.value.name,
            totalTokenNumber: this.tokenForm.value.totalTokenNumber,
            maximumTokenPerUser: this.tokenForm.value.maximumTokenPerUser,
            date: this.tokenForm.value.date,
            tokenPrice: this.tokenForm.value.tokenPrice,
            prize: valuesArray,
            token: accessToken,
        };
        console.log(data)

        this.tokenService.createToken(data).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.snackbarServiceService.success(response.message, 4000);
                }
            },
            (error) => {
                this.snackbarServiceService.error(error.error.message, 4000);
                console.log(error);
            }
        );
    }

        
    
}
