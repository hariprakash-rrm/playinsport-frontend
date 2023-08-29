import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
})
export class TokenComponent implements OnInit {


  gameId: any = null
  youtubeLink: string = null;
  youtubeLiveLink: string = null;
  facebookLink: string = null;
  facebookLiveLink: string = null;

  selectedTime: any;
  selectedTab:any
  selectedDate: Date;

  defaultValue = { hour: 13, minute: 30 };
  games: any

  winner: string = 'Not yet updated'
  winners: any;


  timeChangeHandler(event: any) { }

  invalidInputHandler() { }


  constructor(private snackbar: SnackbarServiceService, private service: TokenService,) {

    // this.selectedDate = new Date();
  }

  async ngOnInit() {
    this.getGame()
  }


  onDateChange(event: any) {
    // console.log('Selected Date:', this.selectedDate);

    this.getGame()
  }

  getGame() {
    //testing purpose
    // console.log('trigger')
    let tDate='Thu Aug 26 2023 00:00:00 GMT+0530 (India Standard Time)'
    this.service.getGames(tDate).subscribe(
      (response) => {
        if (response.statusCode === 201) {
          this.snackbar.success(response.message, 4000);
          this.games = response.data.data
          this.youtubeLink = response.data.data.youtubeLink;
          this.youtubeLiveLink = response.data.data.youtubeLiveLink;
          this.facebookLink = response.data.data.facebookLink;
          this.facebookLiveLink = response.data.data.facebookLiveLink;
          this.winners = response.data.data.winnerList
          console.log(response.data.data);
        }
      },
      (error) => {
        this.games = []
        this.snackbar.error(error.error.message, 4000);
      }
    );
  }

  activity() {
    // // console.log('triggered',this.gameId)

    // Handle the emitted event here
    this.gameId = null
    // Perform any other actions with the token value
    this.youtubeLink = null;
    this.youtubeLiveLink = null;
    this.facebookLink = null;
    this.facebookLiveLink = null;
  }

  getLink(roundNumber: number) {
    this.games.forEach((element: any) => {
      if (element.round == roundNumber) {
        // console.log(element);
        this.youtubeLiveLink = element?.youtubeLiveLink;
        this.youtubeLink = element?.youtubeLink;
        this.facebookLiveLink = element?.facebookLiveLink;
        this.facebookLink = element?.facebookLink;
      }
    });
  }

  

}
