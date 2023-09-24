import { Component, OnInit } from '@angular/core';
import { ExchangeUserService } from '../service/exchange-user.service';
import { ActivatedRoute } from '@angular/router';
import { findLastIndex } from 'lodash';
import { UserService } from 'app/core/user/user.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

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
    current: any = {};
    isBetLoading: boolean = false;
    currentAmount = 0;
    userData: any = {};
    constructor(
        private exchangeService: ExchangeUserService,
        private route: ActivatedRoute,
        private _userService: UserService,
        private snackBar: SnackbarServiceService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((queryParams) => {
            const id = queryParams['id'];
           
            // console.log(');
            this.findExchangeById(id);
        });
        const accessToken = localStorage.getItem('accessToken');
        this._userService.getUserDetails(accessToken).subscribe(
            (response) => {
                // console.log(response);
                if (response.statusCode === 201) {
                    console.log(response, 'RESPOSE,,,,,');
                    this.userData.username = response.data.username;
                    this.userData.usernumber = response.data.number;
                   
                    
                }
            },
            (error) => {
                this.snackBar.error(error.error.message, 4000);
                // // console.log(error);
                localStorage.clear();
                window.location.reload();
            }
        );

        
    }
    accordionToggle() {
        this.isAccordionShown = !this.isAccordionShown;
    }
    openModal() {
        this.isModalShown = true;
    }
    closeModal() {
        this.isModalShown = false;
        this.currentAmount = 0;
        this.current = {};
    }
    findExchangeById(id: number): void {
        this.exchangeService.findById(id).subscribe(
            (data) => {
                // Handle the response data here
                console.log(data);
                this.AllData=(data);
            },
            (error) => {
                console.error('Error fetching exchange', error);
            }
        );
    }
    

    placePrediction(id, data) {
        // Create a function to update exchange details
    }

    betTeam(team: any, odds: any, id: any) {
        this.current.team = team;
        this.current.odds = odds;
        this.current.id = id;
        console.log('id', id);
    }

    betNow(team: any, odds: any) {
        this.isBetLoading = true;
        console.log(this.userData, 'userdata');
        let _data: any = {
            username: this.userData.username,
            usernumber: this.userData.usernumber,
            amount: this.currentAmount,
            team: team,
        };
        console.log(_data, 'data');
        this.exchangeService
            .predict(this.current.id, _data)
            .subscribe(
                (data) => {
                    // Handle the response data here
                    console.log('Updated exchange details:', data);
                  this.isBetLoading=false
                  this.snackBar.success('Bet placed',3000)
                    // You can also update any component properties or perform other actions as needed
                },
                (error:any) => {
                  this.isBetLoading=false
                    console.error('Error updating exchange details', error);
                    this.snackBar.error(error.error.message,3000)
                }
            );
    }

  
}
