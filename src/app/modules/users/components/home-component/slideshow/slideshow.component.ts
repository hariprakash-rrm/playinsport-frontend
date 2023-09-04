import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {


  
  banners = [
    'https://www.ciim.in/wp-content/uploads/2021/01/refer_earn.jpeg',
    'https://ph-files.imgix.net/f2c5a758-67d4-4ce5-866f-8b0d239937c9.png?auto=format&fit=crop'
  ];
  currentBannerIndex = 0;

  constructor(private router: Router) { }


  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.nextBanner();
    }, 3000);
  }

  nextBanner() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
  }

  get currentBanner() {
    return this.banners[this.currentBannerIndex];
  }

  navigateToDestination() {
    // console.log('triggered',this.currentBannerIndex)
    this.router.navigate(['/user/token']);
  }

}
