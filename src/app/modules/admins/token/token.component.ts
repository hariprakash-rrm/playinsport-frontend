import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
    selector: 'app-tokens',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
    name: string;
    totalTokenNumber: number;
    maximumTokenPerUser: number;
    date: Date;
    tokenPrice: number;
    prize: string;

    constructor(
        private tokenService: TokenService,
        private snackbarServiceService: SnackbarServiceService
    ) {}

    ngOnInit(): void {}

    tokenCreation(): void {
        const accessToken = localStorage.getItem('accessToken');
        const valuesArray: string[] = this.prize.split(',');
        const data = {
            name: this.name,
            totalTokenNumber: this.totalTokenNumber,
            maximumTokenPerUser: this.maximumTokenPerUser,
            date: this.date,
            tokenPrice: this.tokenPrice,
            prize: valuesArray,
            token: accessToken,
        };

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
