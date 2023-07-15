import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Router } from '@angular/router';
import { SlotTokenService } from './service/slot-token.service';

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
  
  gameId:any=null
  selectedTime: any;
  selectedDate: Date;
  cards: CardData[];
  defaultValue = { hour: 13, minute: 30 };
  games:any
  

  timeChangeHandler(event: any) {}

  invalidInputHandler() {}


  constructor( private snackbar: SnackbarServiceService,private slotService:SlotTokenService,) {

    this.selectedDate = new Date();
  }

  async ngOnInit() {
   
  }


  onDateChange(event: any) {
    console.log('Selected Date:', this.selectedDate);
    this.getGame()
  }

  getGame(){
    this.slotService.getGames(this.selectedDate).subscribe(
      (response) => {
          if (response.statusCode === 201) {
              this.snackbar.success(response.message, 4000);
              // console.log(response)
              this.games=response.data.data
              console.log(this.games[0].date)
          }
      },
      (error) => {
        console.log(error);
        this.games=[]
          this.snackbar.error(error.error.message, 4000);
          
      }
  );
  }

  activity() {
    console.log('triggered',this.gameId)

    // Handle the emitted event here
    this.gameId=null
    // Perform any other actions with the token value
  }


}
