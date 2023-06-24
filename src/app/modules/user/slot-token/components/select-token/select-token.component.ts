import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Socket } from 'ngx-socket-io';


interface Seat {
  round:any
  tokenNumber: number;
  selectedBy: string;
  isSelected: boolean;
  userSelected: boolean
}

@Component({
  selector: 'app-select-token',
  templateUrl: './select-token.component.html',
  styleUrls: ['./select-token.component.scss']
})

export class SelectTokenComponent implements OnInit {
  message: string;
  messages: string[] = [];
  onlineUsers: number = 0;
  isDisabled: any = []
  seats: Seat[] = [];
  tokenData = []
  userDetails: any
  round:any=1

  constructor(private socket: Socket, private snackbar: SnackbarServiceService) { }

  async ngOnInit() {
    let user = await localStorage.getItem('user')
    this.userDetails = JSON.parse(user)
    console.log(this.userDetails)
    this.triggerSocket()
  }

  async triggerSocket() {
    this.socket.on('connect', () => {
      const socketId = this.socket.ioSocket.id;
      console.log(`Socket ID: ${socketId}`);
      this.userDetails.socketId = socketId
      // You can use the socket ID for further operations
    });

    this.socket.fromEvent('chat').subscribe((message: any) => {
      console.log(this.seats)
    });
    this.socket.fromEvent('isError').subscribe((message: any) => {
      console.log(message)
      this.snackbar.error(message?.message, 3000)
    });
    this.socket.emit('getGame')

    this.socket.fromEvent('getGame').subscribe((message: any) => {
      for (let i = 0; i < message.length; i++) {

        this.seats.push({
          round:this.round,
          tokenNumber: i,
          selectedBy: '',
          isSelected: false,
          userSelected: false,
        
        });
      }

      this.handle(message)
      this.tokenData = message
      console.log('haha', message)

    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
  }

  async handle(message: any) {
    this.seats = []
    for (let i = 0; i < message.length; i++) {
      this.seats.push(message[i])
    }
    for (let i = 0; i < message.length; i++) {
      console.log(this.userDetails.username, this.seats[i].selectedBy)
      if (this.userDetails.name == this.seats[i].selectedBy) {
        this.seats[i].userSelected = true
      }
    }


    // for (let i = 0; i <= 32; i++) {
    //   this.seats[i].disable=true
    //   }

    //   for (let i = 0; i <message.totalToken.length; i++) {
    //     this.seats[message.totalToken[i]].disable= false
    //     console.log( this.seats[message.totalToken[i]].disable,i)
    //   }
  }

  toggleSeatSelection(index: number, isSelected: any): void {
    console.log(index);

    if (isSelected) {
      this.snackbar.error(`This token is selected by ${this.seats[index - 1].selectedBy}`, 4000)
      return
    }
    let token = localStorage.getItem('accessToken')
    let message = {
      token: token,
      index: index - 1,
      tokenNumber: index,
      id: this.userDetails.socketId
    }

    // this.seats[index].selected = !this.seats[index].selected;
    // console.log('Seat ' + (index + 1) + ' selected:', this.seats[index].selected);
    this.socket.emit('chat', message);
  }

}
