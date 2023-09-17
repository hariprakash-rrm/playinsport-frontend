import { Component, OnInit } from '@angular/core';
import { ExchangeUserService } from '../service/exchange-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-exchange-cricket',
    templateUrl: './exchange-cricket.component.html',
    styleUrls: ['./exchange-cricket.component.scss'],
})
export class ExchangeCricketComponent implements OnInit {
    activeTab = 'tab1';
    isAccordionShown: boolean = false;
    isModalShown: boolean = false;
    AllData: any;
    Toss: any;
    Match: any;
    constructor(
        private exchangeService: ExchangeUserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((queryParams) => {
            const team1 = queryParams['team1'];
            const team2 = queryParams['team2'];
            // console.log(');
            this.filterExchanges(team1, team2);
        });
    }
    accordionToggle() {
        this.isAccordionShown = !this.isAccordionShown;
    }
    openModal() {
        this.isModalShown = true
    }
    closeModal() {
        this.isModalShown = false;
    }
    findExchangeById(id: number): void {
        this.exchangeService.findById(id).subscribe(
            (data) => {
                // Handle the response data here
                console.log(data);
                this.AllData = data;
            },
            (error) => {
                console.error('Error fetching exchange', error);
            }
        );
    }

    filterExchanges(team1: string, team2: string): void {
        this.exchangeService.filterExchanges(team1, team2).subscribe(
            (data) => {
                // Handle the response data here
                this.AllData = data;
                console.log(data);
                this.Match = data.filter((exch) => exch.mode == 'match');
                console.log(this.Match, 'Match');
            },
            (error) => {
                console.error('Error fetching filtered exchanges', error);
            }
        );
    }

    placePrediction(id, data) {
        // Create a function to update exchange details
        let _data: any = {
            username: '',
            usernumber: '',
            amount: '',
            team: '',
        };
        this.exchangeService.updateExchangeDetails(id, _data).subscribe(
            (data) => {
                // Handle the response data here
                console.log('Updated exchange details:', data);

                // You can also update any component properties or perform other actions as needed
            },
            (error) => {
                console.error('Error updating exchange details', error);
            }
        );
    }
}
