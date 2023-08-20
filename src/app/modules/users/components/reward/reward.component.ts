import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  coupenCode: string;

  constructor() { }

  ngOnInit(): void {
  }

  claimReward(){
    
  }

}
