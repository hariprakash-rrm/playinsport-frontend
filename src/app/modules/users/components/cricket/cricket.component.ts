import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cricket',
    templateUrl: './cricket.component.html',
    styleUrls: ['./cricket.component.scss'],
})
export class CricketComponent implements OnInit {
    constructor() {}
    activeTab = 'tab1';
    ngOnInit(): void {}
}
