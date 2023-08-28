import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }

   navigateToDestination() {
   
    this.router.navigate(['/user/token']);
  }

}
