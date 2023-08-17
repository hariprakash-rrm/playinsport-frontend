import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {


  
  banners = [
    'https://t4.ftcdn.net/jpg/04/59/48/15/360_F_459481536_QyHEGtoIASEBK49fdg5ZhuOEfOGnOYaS.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq_oQ4_ahQzI2vzj82NVvmO6YH30uTgJpmUw',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWm2CY-FGrg9RYPsRREm32A-VHsfphPn3Lg'
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
    console.log('triggered',this.currentBannerIndex)
    this.router.navigate(['/user/token']);
  }

}
