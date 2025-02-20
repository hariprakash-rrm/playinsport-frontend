import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { TokenService } from '../../token.service';

@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
    gameId: any = null;
    youtubeLink: any = null;
    youtubeLiveLink: string = null;
    facebookLink: string = null;
    facebookLiveLink: string = null;

    selectedTime: any;
    selectedTab: any = 'live';
    selectedDate: Date;

    defaultValue = { hour: 13, minute: 30 };
    games: any;
    prizes: any;

    winner: string = 'Not yet updated';
    winners: any;
    viewPrize: boolean = false;

    timeChangeHandler(event: any) {}

    invalidInputHandler() {}

    constructor(
        private snackbar: SnackbarServiceService,
        private service: TokenService
    ) {
        // this.selectedDate = new Date();
    }

    async ngOnInit() {
        this.getGame();
    }

    viewPrizes(card: any) {
        console.log(card);
        this.prizes = card.prize;
        this.viewPrize = true;
    }
    CloseModal() {
        this.viewPrize = false;
    }

    onDateChange(event: any) {
        // console.log('Selected Date:', this.selectedDate);

        this.getGame();
    }

    setData(card: any) {
        this.gameId = card?.round;
        this.youtubeLink = card?.youtubeLink;
        this.youtubeLiveLink = card?.youtubeLiveLink;
        this.facebookLink=card?.facebookLink;
        this.facebookLiveLink=card?.facebookLiveLink
    }

    getGame() {
        //testing purpose
        // console.log('trigger')
        let tDate = 'Sat Sep 2 2023 00:00:00 GMT+0530 (India Standard Time)';
        this.service.getGames(tDate).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.snackbar.success(response.message, 4000);
                    this.games = response.data.data;
                    this.youtubeLink = response.data.data.youtubeLink;
                    this.youtubeLiveLink = response.data.data.youtubeLiveLink;
                    this.facebookLink = response.data.data.facebookLink;
                    this.facebookLiveLink = response.data.data.facebookLiveLink;
                    this.winners = response.data.data.winnerList;
                    console.log(response.data.data);
                }
            },
            (error) => {
                this.games = [];
                this.snackbar.error(error.error.message, 4000);
            }
        );
    }

    activity() {
        // // console.log('triggered',this.gameId)

        // Handle the emitted event here
        this.gameId = null;
        // Perform any other actions with the token value
        this.youtubeLink = null;
        this.youtubeLiveLink = null;
        this.facebookLink = null;
        this.facebookLiveLink = null;
    }

    // getLink(roundNumber: number) {
    //   this.games.forEach((element: any) => {
    //     if (element.round == roundNumber) {
    //       // console.log(element);
    //       this.youtubeLiveLink = element?.youtubeLiveLink;
    //       this.youtubeLink = element?.youtubeLink;
    //       this.facebookLiveLink = element?.facebookLiveLink;
    //       this.facebookLink = element?.facebookLink;
    //     }
    //   });
    // }
}
