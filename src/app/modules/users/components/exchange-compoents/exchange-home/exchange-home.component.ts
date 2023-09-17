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
        this.exchangeService.getLiveExchanges().subscribe(
            (data) => {
                this.exchanges = data;
                console.log(data);
                this.cricket = data.filter(exchange => exchange.types === 'Cricket');
                console.log(this.cricket)
            },
            
            (error) => {
                console.error('Error fetching exchanges', error);
            }
        );
    }
}
