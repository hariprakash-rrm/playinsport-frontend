import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
interface Seat {
  label: string;
  selected: boolean;
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
  seats: Seat[] = [];
  constructor(private socket: Socket) {
    for (let i = 1; i <= 32; i++) {
      this.seats.push({
        label: 'Seat ' + i,
        selected: false,
      });
    }
  }

  ngOnInit() {
    this.socket.fromEvent('chat').subscribe((message: string) => {
      this.messages.push(message);
      console.log(message)
    });

    this.socket.fromEvent('getGame').subscribe((message: string) => {

      console.log(message)
    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
  }

  toggleSeatSelection(index: number): void {
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
