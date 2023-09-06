import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

routeLink:any=['/user/refer','/user/token']
  
  banners = [
    'https://t4.ftcdn.net/jpg/04/90/93/03/360_F_490930345_3ToZEj1ijJolIiC0LAsOSrjsxCiHUhzP.jpg',
    'https://static.vecteezy.com/system/resources/previews/003/475/731/original/play-and-win-big-prizes-contest-online-games-web-banner-free-vector.jpg'
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
    this.router.navigate([this.routeLink[this.currentBannerIndex]]);
  }

}
