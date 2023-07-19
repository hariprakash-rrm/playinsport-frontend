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
    create: boolean = true
    isEditing: boolean = false
    round:any=0
    data:any
    action:any
    isSearch: boolean = false
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

    ngOnInit(): void { }

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

    updateRound(){
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            round:this.round,

            action:this.action,
            token:accessToken
        };
        console.log(data)

        this.tokenService.updateRound(data).subscribe(
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

    searchRound(){
        this.tokenService.getRound(this.round).subscribe((res:any)=>{
            if (res.statusCode === 201) {
                this.snackbarServiceService.success(res.message, 4000);
                let data={
                    name: res.data.data.name,
                    prize: res.data.data.prize,
                    tokenPrice: res.data.data.tokenPrice,
                    date: res.data.data.date,
                    maximumTokenPerUser: res.data.data.maximumTokenPerUser,
                    totalTokenNumber: 1,
                    status:res.data.data.isComplete
                  };
                  this.data=data
            }
            console.log(res)
        } ,(error) => {
            this.snackbarServiceService.error(error.error.message, 4000);
            console.log(error);
        })
    }

    viewSearch(): void{
        this.isSearch=true;
    }

   

}
