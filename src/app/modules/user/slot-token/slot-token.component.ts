import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
interface Seat {
  label: number;
  selected: boolean;
  disable:boolean
}
@Component({
  selector: 'app-slot-token',
  templateUrl: './slot-token.component.html',
  styleUrls: ['./slot-token.component.scss']
})
export class SlotTokenComponent implements OnInit {

  message: string;
  messages: string[] = [];
  onlineUsers: number = 0;
  isDisabled: any = []
  seats: Seat[] = [];
  

  constructor(private socket: Socket) {
    for (let i = 0; i <= 32; i++) {
      this.seats.push({
        label:  i,
        selected: false,
        disable:true
      });
    }
  
  }

  ngOnInit() {
    
    this.socket.fromEvent('chat').subscribe((message: any) => {
      console.log(this.seats)
    });
    this.socket.emit('getGame')

    this.socket.fromEvent('getGame').subscribe((message: any) => {
      this.handle(message)
      console.log('haha', message)

    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
  }

 async handle(message:any){
  
  for (let i = 0; i <= 32; i++) {
    this.seats[i].disable=true
    }
  
    for (let i = 0; i <message.length; i++) {
      this.seats[message[i]].disable= false
      console.log( this.seats[message[i]].disable,i)
    }
  }

  toggleSeatSelection(index: number, ): void {
    
    let token = localStorage.getItem('accessToken')
    let message = {
      token: token,
      message: index
    }

    this.seats[index].selected = !this.seats[index].selected;
    console.log('Seat ' + (index + 1) + ' selected:', this.seats[index].selected);
    this.socket.emit('chat', message);
  }
}
