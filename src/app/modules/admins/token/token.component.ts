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
    viewForm: FormGroup
    name: string
    prize: any
    tokenPrice: any
    date: any
    rounds: any = 0;
    maximumTokenPerUser: any
    totalTokenNumber: number
    status: any
  youtubeLinks: string = '';
  youtubeLiveLink: string = '';
  facebookLinks: string = '';
  facebookLiveLink: string = '';

    create: boolean = true
    isEditing: boolean = false
    isEditings: boolean = false

    data: any
    action: any
    isSearch: boolean = false
    isAddLink: boolean = false
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
            youtubeLink: new FormControl('', Validators.required),
            facebookLink: new FormControl('', Validators.required)
        });

        // this.viewForm = this._formBuilder.group({
        //     youtubeLinks: new FormControl('', Validators.required),
        //     facebookLinks: new FormControl('', Validators.required),
        //     facebookLiveLink: new FormControl('', Validators.required),
        //     youtubeLiveLink: new FormControl('', Validators.required)
        // });
    }

    // get youtubeLinks() {
    //     return this.viewForm.get('youtubeLinks');
    // }

    // get facebookLinks() {
    //     return this.viewForm.get('facebookLinks');
    // }

    // get youtubeLiveLink() {
    //     return this.viewForm.get('youtubeLiveLink');
    // }

    // get facebookLiveLink() {
    //     return this.viewForm.get('facebookLiveLink');
    // }

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
            youtubeLink: this.tokenForm.value.youtubeLink,
            facebookLink: this.tokenForm.value.facebookLink
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

    updateRound() {
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            round: this.rounds,

            action: this.action,
            token: accessToken
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

    liveUpdate() {
        console.log(this.viewForm.value.youtubeLiveLink)
        const accessToken = localStorage.getItem('accessToken');
        console.log("LIVEUPDATE");
        const data = {
            round: this.rounds,
            action: "linkUpdate",
            token: accessToken,
            youtubeLink: this.viewForm.value.youtubeLinks,
            youtubeLiveLink: this.viewForm.value.youtubeLiveLink,
            facebookLink: this.viewForm.value.facebookLinks,
            facebookLiveLink: this.viewForm.value.facebookLiveLink
        };

        this.tokenService.updateRound(data).subscribe(
            (response) => {
                console.log(response);
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

    searchRound() {
        this.tokenService.getRound(this.rounds).subscribe((res: any) => {
            console.log('Value of rounds:', this.rounds);

            if (res.statusCode === 201) {
                this.snackbarServiceService.success(res.message, 4000);
                this.name = res.data.data.name;
                this.prize = res.data.data.prize;
                this.tokenPrice = res.data.data.tokenPrice;
                this.date = res.data.data.date;
                this.maximumTokenPerUser = res.data.data.maximumTokenPerUser;
                this.totalTokenNumber = 1;
                this.status = res.data.data.status;
                this.youtubeLinks = res.data.data.youtubeLink;
                this.youtubeLiveLink = res.data.data.youtubeLiveLink;
                this.facebookLinks = res.data.data.facebookLink;
                this.facebookLiveLink = res.data.data.facebookLiveLink;

            }
            console.log(res)
        }, (error) => {
            this.snackbarServiceService.error(error.error.message, 4000);
        })
    }

    viewSearch(): void {
        this.isSearch = true;
    }

    addLiveLink() {
        this.isAddLink = true;
    }

    toggleEdit(): void {
        console.log("Toggle");
        if (1) {
            this.snackbarServiceService.error('Round not found', 4000);
            return;
        }
        this.isEditing = !this.isEditing;
        if (!this.isEditing) {
            const AccessToken = localStorage.getItem('accessToken');
            console.log(AccessToken);

            const data = {
                round: this.rounds,

                action: this.action,
                token: AccessToken,
                youtubeLink: this.viewForm.value.youtubeLinks,
                youtubeLiveLink: this.viewForm.value.youtubeLiveLink,
                facebookLink: this.viewForm.value.facebookLinks,
                facebookLiveLink: this.viewForm.value.facebookLiveLink
            };
            this.tokenService.liveUpdate(data).subscribe(
                (response) => {
                    if (response.statusCode === 201) {
                    }
                    this.snackbarServiceService.success(response.message, 4000);
                },
                (error) => {
                    console.log(error);
                    this.snackbarServiceService.error(error.error.message, 4000);
                }
            );
        }

    }

    editing() {
        this.isEditing = true;
    }
}
