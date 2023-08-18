import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Socket } from 'ngx-socket-io';


interface Seat {
  round: any;
  tokenNumber: number;
  selectedBy: string;
  isSelected: boolean;
  userSelected: boolean;
}
@Component({
  selector: 'app-select-token',
  templateUrl: './select-token.component.html',
  styleUrls: ['./select-token.component.css']

})
export class SelectTokenComponent implements OnInit, OnDestroy {

  @Input() gameId: number;
  @Output() activity: EventEmitter<string> = new EventEmitter<string>();
  message: string;
  messages: string[] = [];
  onlineUsers: number = 0;
  isDisabled: any = [];
  seats: Seat[] = [];
  tokenData = [];
  userDetails: any;
  round: number = 1;
  viewSelected: boolean
  @Input() youtubeLink: string;
  @Input() youtubeLiveLink: string;
  @Input() facebookLink: string;
  @Input() facebookLiveLink: string;


  constructor(
    private socket: Socket,
    private snackbar: SnackbarServiceService,
    private router: Router
  ) { }

  /**git ou
   * Calls when page loads
   */
  async ngOnInit() {
    this.viewSelected = false
    this.round = this.gameId
    let user = await localStorage.getItem('user');
    this.userDetails = JSON.parse(user);

    this.triggerSocket();
    console.log(this.youtubeLink);
    console.log('facebooklink', this.facebookLink);


  }

  /**
   * triggering socket connection
   */
  async triggerSocket() {
    this.socket.on('connect', async () => {
      const socketId = this.socket.ioSocket.id;
      this.userDetails.socketId = await socketId;
      this.handleSocketResponse();
    });
    this.socket.connect()
    await this.socket.on('disconnect', () => {
    });
  }


  /**
   * 
   * @param message 
   * @returns 
   */
  handleSeats(message: any) {
    // console.log(message)
    if (+this.round == +message[0].round) {
      for (let i = 0; i < message.length; i++) {
        this.seats.push({
          round: this.round,
          tokenNumber: i,
          selectedBy: '',
          isSelected: false,
          userSelected: false,
        });
      }
      this.handleSeatData(message);
      this.tokenData = message;
    } else {
      return;
    }
  }

  /**
   * 
   * @param message 
   */
  async handleSeatData(message: any) {
    this.seats = [];
    for (let i = 0; i < message.length; i++) {
      this.seats.push(message[i]);
    }
    for (let i = 0; i < message.length; i++) {
      // console.log(this.userDetails.username, this.seats[i].selectedBy)
      if (this.userDetails.name == this.seats[i].selectedBy) {
        this.seats[i].userSelected = true;
      }
    }
  }

  /**
   * handling socket respose - error , game , balance etc
   */
  handleSocketResponse() {
    let token = localStorage.getItem('accessToken');
    this.socket.fromEvent('userBalance').subscribe((message: any) => {
      console.log('token', message);

    });

    this.socket.fromEvent('isError').subscribe((message: any) => {
      this.snackbar.error(message?.message, 3000);

    });

    this.socket.fromEvent('game').subscribe((message: any) => {
      this.handleSeats(message);

      console.log('handleseat', message);
    });

    this.socket.emit('getGame', this.round);
    this.socket.emit('game', this.round);
    let balanceQuery = {
      token: token,
      userId: this.userDetails.socketId,
    };
    this.socket.emit('userBalance', balanceQuery);
    this.socket.fromEvent('getGame').subscribe((message: any) => {
      if (+this.round == +message.round) {
        this.seats[message.tokenNumber - 1] = message;
        if (
          this.userDetails.name ==
          this.seats[message.tokenNumber - 1].selectedBy
        ) {
          this.seats[message.tokenNumber - 1].userSelected = true;
        }

      } else {
        return;
      }
    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
  }

  /**
   * Selecting tokens
   * @param index 
   * @param isSelected 
   * @returns 
   */
  toggleSeatSelection(index: number, isSelected: boolean): void {
    if (isSelected) {
      this.snackbar.error(
        `This token is selected by ${this.seats[index - 1].selectedBy}`,
        4000
      );
      return;
    }
    let token = localStorage.getItem('accessToken');
    let message = {
      token: token,
      index: index - 1,
      tokenNumber: index,
      id: this.userDetails.socketId,
      round: this.round,
    };
    this.socket.emit('chat', message);
  }

  /**
   * change game or date it will destroy this page
   */
  async changeGame() {
    this.activity.emit();
    this.socket.disconnect();
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  /**
   * viewing selected tokens
   */
  viewSelectedTokens() {
    this.viewSelected = !this.viewSelected
  }
  closeSelectedTokens() {
    this.viewSelected = false;
  }

  onLinkSelected(selectedLink: string) {
    if (selectedLink) {
      window.open(selectedLink, '_blank');
    }

  }

}
