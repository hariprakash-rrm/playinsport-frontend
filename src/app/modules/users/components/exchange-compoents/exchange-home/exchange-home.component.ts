import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-home',
  templateUrl: './exchange-home.component.html',
  styleUrls: ['./exchange-home.component.scss']
})
export class ExchangeHomeComponent implements OnInit {
  showTennisTeams: boolean = false;
  showCricketTeams: boolean = false;

 
  constructor() { }

  ngOnInit(): void {
  }

  toggleTennisTeams() {
    this.showTennisTeams = !this.showTennisTeams;
  }

  toggleCricketTeams() {
    this.showCricketTeams = !this.showCricketTeams;
  }

}
