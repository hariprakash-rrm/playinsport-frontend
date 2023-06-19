import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
interface Seat {
  id: number;
  name: string;
  isBooked: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;
  messages: string[] = [];
  onlineUsers: number = 0;

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.fromEvent('chat').subscribe((message: string) => {
      this.messages.push(message);
    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
  }

  sendMessage() {
    let token = localStorage.getItem('accessToken')
    let message= {
token:token,
message :this.message
    }
    if (this.message) {
      this.socket.emit('chat',message);
      this.message = '';
    }
  }

}
