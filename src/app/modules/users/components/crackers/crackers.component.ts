import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crackers',
  templateUrl: './crackers.component.html',
  styleUrls: ['./crackers.component.scss']
})
export class CrackersComponent implements OnInit {
  public isMobileToggled = false; 
  constructor() { }

  ngOnInit(): void {
  }

}