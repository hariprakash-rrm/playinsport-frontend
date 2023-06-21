import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
interface Seat {
  label: number;
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
  isDisabled: any = []
  seats: Seat[] = [];
  test:any=[]
  constructor(private socket: Socket) {
    for (let i = 1; i <= 32; i++) {
      this.seats.push({
        label:  i,
        selected: false,
      });
      this.test.push(i)
      this.isDisabled.push(false)
    }
  }

  ngOnInit() {
    this.socket.emit('getGame')
    this.socket.fromEvent('chat').subscribe((message: any) => {
      this.messages.push(message);
      console.log(message)
      for (let i = 0; i <message.length; i++) {
        let index = this.test.indexOf(message[i])
        console.log(index)
        if (index) {
          this.isDisabled[i] = true
        }
      }
      console.log(this.isDisabled)
    });

    this.socket.fromEvent('getGame').subscribe((message: any) => {

      console.log('haha', message)

    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
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
