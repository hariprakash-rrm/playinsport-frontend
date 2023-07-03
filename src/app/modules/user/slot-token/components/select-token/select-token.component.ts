import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Socket } from 'ngx-socket-io';

interface Seat {
    round: any;
    tokenNumber: number;
    selectedBy: string;
    isSelected: boolean;
    userSelected: boolean;
}

@Component({
    selector: 'app-select-token',
    templateUrl: './select-token.component.html',
    styleUrls: ['./select-token.component.scss'],
})
export class SelectTokenComponent implements OnInit {
    message: string;
    messages: string[] = [];
    onlineUsers: number = 0;
    isDisabled: any = [];
    seats: Seat[] = [];
    tokenData = [];
    userDetails: any;
    round: any = 1;

    constructor(
        private socket: Socket,
        private snackbar: SnackbarServiceService
    ) {}

    async ngOnInit() {
        let user = await localStorage.getItem('user');
        this.userDetails = JSON.parse(user);
        console.log(this.userDetails);
        this.triggerSocket();
    }

    async triggerSocket() {
        this.socket.on('connect', async () => {
            const socketId = this.socket.ioSocket.id;
            // console.log(`Socket ID: ${socketId}`);
            this.userDetails.socketId = await socketId;
            this.handleSocketResponse();
            // You can use the socket ID for further operations
        });
    }

    handleSeats(message: any) {
        if (+this.round == +message[0].round) {
            for (let i = 0; i < message.length; i++) {
                this.seats.push({
                    round: this.round,
                    tokenNumber: i,
                    selectedBy: '',
                    isSelected: false,
                    userSelected: false,
                });
            }
            this.handleSeatData(message);
            this.tokenData = message;
        } else {
            return;
        }
    }

    async handleSeatData(message: any) {
        this.seats = [];
        for (let i = 0; i < message.length; i++) {
            this.seats.push(message[i]);
        }
        for (let i = 0; i < message.length; i++) {
            // console.log(this.userDetails.username, this.seats[i].selectedBy)
            if (this.userDetails.name == this.seats[i].selectedBy) {
                this.seats[i].userSelected = true;
            }
        }
    }

    handleSocketResponse() {
        // this.socket.fromEvent('chat').subscribe((message: any) => {
        //   console.log(this.seats)
        // });

        let token = localStorage.getItem('accessToken');
        this.socket.fromEvent('userBalance').subscribe((message: any) => {
            console.log('user balance ', message);
        });

        this.socket.fromEvent('isError').subscribe((message: any) => {
            console.log(message);
            this.snackbar.error(message?.message, 3000);
        });

        this.socket.fromEvent('game').subscribe((message: any) => {
            console.log(message);
            this.handleSeats(message);
        });

        this.socket.emit('getGame', this.round);
        this.socket.emit('game', this.round);
        let balanceQuery = {
            token: token,
            userId: this.userDetails.socketId,
        };
        this.socket.emit('userBalance', balanceQuery);
        this.socket.fromEvent('getGame').subscribe((message: any) => {
            console.log(message);
            if (+this.round === +message.round) {
                this.seats[message.tokenNumber - 1] = message;
                console.log(this.seats[message.tokenNumber - 1]);
                if (
                    this.userDetails.name ===
                    this.seats[message.tokenNumber - 1].selectedBy
                ) {
                    this.seats[message.tokenNumber - 1].userSelected = true;
                }

                // this.handleSeats(message)
            } else {
                return;
            }
        });

        this.socket.fromEvent('users').subscribe((users: number) => {
            this.onlineUsers = users;
        });
    }

    toggleSeatSelection(index: number, isSelected: any): void {
        // console.log(index);

        if (isSelected) {
            this.snackbar.error(
                `This token is selected by ${this.seats[index - 1].selectedBy}`,
                4000
            );
            return;
        }
        let token = localStorage.getItem('accessToken');
        let message = {
            token: token,
            index: index - 1,
            tokenNumber: index,
            id: this.userDetails.socketId,
            round: this.round,
        };

        // this.seats[index].selected = !this.seats[index].selected;
        // console.log('Seat ' + (index + 1) + ' selected:', this.seats[index].selected);
        this.socket.emit('chat', message);
    }
}
