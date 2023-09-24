import { Component, OnInit } from '@angular/core';
import { ExchangeUserService } from '../service/exchange-user.service';

@Component({
    selector: 'app-exchange-home',
    templateUrl: './exchange-home.component.html',
    styleUrls: ['./exchange-home.component.scss'],
})
export class ExchangeHomeComponent implements OnInit {
    expandedCard: string | null = null;
    exchanges: any;
    cricket:any=[]
    toggleCard(cardName: string) {
        if (this.expandedCard === cardName) {
            this.expandedCard = null; // Collapse the card if it's already expanded
        } else {
            this.expandedCard = cardName; // Expand the selected card
        }
    }

    constructor(private exchangeService: ExchangeUserService) {}

    ngOnInit(): void {
        try {
            this.exchangeService.getUnfinalizedExchanges().subscribe(
              (data) => {
                this.exchanges = data; // Update with the response data structure
                console.log(this.exchanges,'exchangeee')
              },
              (error) => {
                console.error('Error:', error);
                // this.errorMessage = 'An error occurred while fetching data.';
              }
            );
          } catch (error) {
            console.error('Try-catch error:', error);
            // this.errorMessage = 'An error occurred.';
          }
    }
}
