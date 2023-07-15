import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Router } from '@angular/router';

interface CardData {
  title: string;
  subtitle: string;
  time: string;
  price: number;
}
@Component({
  selector: 'app-slot-token',
  templateUrl: './slot-token.component.html',
  styleUrls: ['./slot-token.component.scss']
})
export class SlotTokenComponent implements OnInit {
  gameId:any=1
  selectedTime: any;
  selectedDate: Date;
  cards: CardData[];
  defaultValue = { hour: 13, minute: 30 };

  timeChangeHandler(event: any) {}

  invalidInputHandler() {}


  constructor( private snackbar: SnackbarServiceService) {

    this.selectedDate = new Date();
  }

  async ngOnInit() {
   

    this.cards = [
      {
        title: 'Card 1',
        subtitle: 'Card 1 Subtitle',
        time: '10:00 AM',
        price: 10.99
      },
      {
        title: 'Card 2',
        subtitle: 'Card 2 Subtitle',
        time: '2:30 PM',
        price: 19.99
      },
    ];

  }


  onDateChange(event: any) {
    console.log('Selected Date:', this.selectedDate);
  }

  activity() {
    console.log('triggered')
    // Handle the emitted event here
    this.gameId=null
    // Perform any other actions with the token value
  }


}
