import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  
  gameId:any=null
  selectedTime: any;
  selectedDate: Date;

  defaultValue = { hour: 13, minute: 30 };
  games:any
  

  timeChangeHandler(event: any) {}

  invalidInputHandler() {}


  constructor( private snackbar: SnackbarServiceService,private service:TokenService,) {

    // this.selectedDate = new Date();
  }

  async ngOnInit() {
   
  }


  onDateChange(event: any) {
    console.log('Selected Date:', this.selectedDate);
    
    this.getGame()
  }

  getGame(){
    this.service.getGames(this.selectedDate).subscribe(
      (response) => {
          if (response.statusCode === 201) {
              this.snackbar.success(response.message, 4000);
              console.log(response)
              this.games=response.data.data
              // console.log(this.games[0].date)
          }
      },
      (error) => {
        // console.log(error);
        this.games=[]
          this.snackbar.error(error.error.message, 4000);
          
      }
  );
  }

  activity() {
    // console.log('triggered',this.gameId)

    // Handle the emitted event here
    this.gameId=null
    // Perform any other actions with the token value
  }



}
