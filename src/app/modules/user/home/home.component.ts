import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private socket: Socket) {

  }

  ngOnInit() {

  }

  sendMessage() {

  }

}
