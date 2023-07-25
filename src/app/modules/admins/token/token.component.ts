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
    rounds: number = 0;
    maximumTokenPerUser: any
    totalTokenNumber: number
    tab: any = 1
    status: any
    isFetched: boolean = false
    youtubeLinks: string = '';
    youtubeLiveLink: string = '';
    facebookLinks: string = '';
    facebookLiveLink: string = '';
    showDetails: boolean = false
    create: boolean = true
    isEditing: boolean = false
    isEditings: boolean = false
    winnerList: any;

    data: any
    action: string = 'undefined'
    chooseTab: string
    reward: string = null
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

    ngOnInit(): void {
        this.searchRound();
     }

    clear() {
        console.log(this.tokenForm.value.name,)
        this.tokenForm.reset()
        this.rounds = 0
        this.isFetched = false
        console.log(this.tokenForm.value.name,)
    }

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
        // console.log(data)

        this.tokenService.createToken(data).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.snackbarServiceService.success(response.message, 4000);
                }
            },
            (error) => {
                this.snackbarServiceService.error(error.error.message, 4000);
                // console.log(error);
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
        // console.log(data)

        this.tokenService.updateRound(data).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.snackbarServiceService.success(response.message, 4000);
                }
            },
            (error) => {
                this.snackbarServiceService.error(error.error.message, 4000);
                // console.log(error);
            }
        );
    }

    updateRewardType() {

        // if (this.hasDuplicates(this.winnerList)) {
        //     this.snackbarServiceService.error("Getting dupplicate winner list", 4000);
        //     return
        // }
        const valuesArray: string[] = this.winnerList.split(',');

        console.log(valuesArray);
        console.log(valuesArray.length);
        console.log(this.prize.length);

        if (this.prize.length != valuesArray.length) {
            this.snackbarServiceService.error(`Total winning prize for this round is ${this.prize.length}, please check the winner list`, 5000)
            return
        }

        const accessToken = localStorage.getItem('accessToken');
        const data = {
            round: this.rounds,

            rewardType: this.reward,
            token: accessToken,
            winnerList: valuesArray
        };

        console.log(data);

        this.tokenService.updateRewardType(data).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.snackbarServiceService.success(response.message, 4000);
                }
            },
            (error) => {
                this.snackbarServiceService.error(error.error.message, 4000);
            }
        );
    }

    liveUpdate() {
        // if (this.hasDuplicates(this.winnerList)) {
        //     this.snackbarServiceService.error("Check winning list", 4000);
        //     return
        // }

        const accessToken = localStorage.getItem('accessToken');
        const data = {
            round: this.rounds,
            action: "linkUpdate",
            token: accessToken,
            youtubeLink: this.youtubeLinks,
            youtubeLiveLink: this.youtubeLiveLink,
            facebookLink: this.facebookLinks,
            facebookLiveLink: this.facebookLiveLink,
        };

        this.tokenService.updateRound(data).subscribe(
            (response) => {
                // console.log(response);
                if (response.statusCode === 201) {
                    this.snackbarServiceService.success(response.message, 4000);
                }
            },
            (error) => {
                this.snackbarServiceService.error(error.error.message, 4000);
            }
        );
    }

    changeTab(tab: any) {
        this.tab = tab
    }

    searchRound() {
        
        this.tokenService.getRound(this.rounds).subscribe((res: any) => {
            this.snackbarServiceService.success(res.message, 4000);
                this.name = '';
                this.prize = '';
                this.tokenPrice = '';
                this.date = '';
                this.maximumTokenPerUser = 0;
                this.totalTokenNumber = 0;
                this.status = '';
                this.youtubeLinks = '';
                this.youtubeLiveLink = '';
                this.facebookLinks = '';
                this.facebookLiveLink = '';
            if (res.statusCode === 201) {
                this.snackbarServiceService.success(res.message, 4000);
                this.isFetched = true
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
                this.winnerList = res.data.data.winnerList;
            }
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

    // choosetab(status: string) {
    //     console.log(status);
    //     console.log(status === 'finalise');
    //     if (status === 'finalise' || status === 'refund') {
    //         this.tab = 4;
    //     }
    //     else {
    //         this.tab = 3;
    //     }
    // }

    // hasDuplicates(array: any[]): boolean {
    //     return new Set(array).size !== array.length;
    // }

}
