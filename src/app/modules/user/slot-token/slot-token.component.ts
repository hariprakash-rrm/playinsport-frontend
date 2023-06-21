import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Socket } from 'ngx-socket-io';
interface Seat {
  tokenNumber: number;
  selectedBy: string;
  isSelected:boolean
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
  tokenData=[]
  
  

  constructor(private socket: Socket,private snackbar:SnackbarServiceService) {
    
  
  }

  ngOnInit() {
    
    this.socket.fromEvent('chat').subscribe((message: any) => {
      console.log(this.seats)
    });
    this.socket.emit('getGame')

    this.socket.fromEvent('getGame').subscribe((message: any) => {
      for (let i = 0; i <message.length; i++) {
        this.seats.push({
          tokenNumber:  i,
          selectedBy: '',
          isSelected:false
        });
        // if(this.seats[i].selectedBy)
      }
      this.handle(message)
      this.tokenData=message
      console.log('haha', message)

    });

    this.socket.fromEvent('users').subscribe((users: number) => {
      this.onlineUsers = users;
    });
  }

 async handle(message:any){
  this.seats=[]
  for (let i =0;i<message.length;i++){
    this.seats.push(message[i])
  }
  
  // for (let i = 0; i <= 32; i++) {
  //   this.seats[i].disable=true
  //   }
  
  //   for (let i = 0; i <message.totalToken.length; i++) {
  //     this.seats[message.totalToken[i]].disable= false
  //     console.log( this.seats[message.totalToken[i]].disable,i)
  //   }
  }

  toggleSeatSelection(index: number,isSelected:any ): void {
   console.log(isSelected);
   
    if(isSelected){
      this.snackbar.error(`This token is selected by ${this.seats[index-1].selectedBy}`,4000)
      return
    }
    let token = localStorage.getItem('accessToken')
    let message = {
      token: token,
      index: index
    }

    // this.seats[index].selected = !this.seats[index].selected;
    // console.log('Seat ' + (index + 1) + ' selected:', this.seats[index].selected);
    this.socket.emit('chat', message);
  }
}
