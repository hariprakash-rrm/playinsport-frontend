import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-cricket',
  templateUrl: './exchange-cricket.component.html',
  styleUrls: ['./exchange-cricket.component.scss']
})
export class ExchangeCricketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleTab(tab: string) {
    const tabs = ['match', 'toss'];
    tabs.forEach(t => {
      const el = document.getElementById(t);
      if (t === tab) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  toggleTeam(team: string) {
    const teams = ['ind', 'pak'];
    teams.forEach(t => {
      const el = document.getElementById(t);
      if (t === team) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }

}
