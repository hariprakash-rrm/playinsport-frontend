import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { ExchangeService } from './services/exchange.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html',
    styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
    currentTab: string = 'create';
    exchangeForm: FormGroup;
    upExchangeForm: FormGroup;
    exchangeId: number | null = null;
    errorMessage: any;
    exchange: any;
    recentData: any = [];
    constructor(
        private formBuilder: FormBuilder,
        private exchangeService: ExchangeService,
        private snackbar: SnackbarServiceService
    ) {
        this.exchangeForm =
            this.formBuilder.group({
                name: ['', [Validators.required]],
            });
        this.upExchangeForm = this.formBuilder.group({
            id: ['', [Validators.required, Validators.minLength(1)]],
            name: ['', [Validators.required]],
        });
    }
    ngOnInit(): void {
        this.getRecentData();
    }

    getRecentData(): void {
        this.exchangeService.getUnfinalizedExchanges()
            .subscribe((data: any) => {
                this.recentData = data;
                console.log("RECENTDATA-------->", this.recentData);
            });
    }

    createExchange(): void {
        if (this.exchangeForm.valid) {
            const name = this.exchangeForm.get('name')?.value;
            this.exchangeService.createExchange(name).subscribe(
                (response) => {
                    this.exchangeId = response.id;
                    this.errorMessage = null;
                },
                (error) => {
                    this.exchangeId = null;
                    this.errorMessage = 'Error creating exchange.';
                }
            );
        }
    }

    searchExchange() {
        const id = this.upExchangeForm.get('id').value;

        if (!id) {
            return;
        }
        console.log("ID", id)
        this.exchangeService.getMatchById(id).subscribe(
            (exchange) => {

                this.exchange = exchange; // Set the retrieved exchange data
                this.upExchangeForm.patchValue({
                    name: exchange.name,
                });
            },
            (error) => {
                console.error('Error fetching exchange:', error);
                this.snackbar.error("Error fetching exchange", 4000);
            }
        );
    }

    update() {
        console.log(this.upExchangeForm.get('id').value)
        console.log(this.upExchangeForm.get('name').value)
        console.log(this.upExchangeForm.valid)
        if (!this.upExchangeForm.valid) {
            return;
        }

        const id = this.upExchangeForm.get('id').value;
        const name = this.upExchangeForm.get('name').value;

        // If there's an existing exchange, update it
        this.exchangeService.updateExchange(id, name).subscribe(
            (response) => {
                // Handle the success response
                console.log('Exchange updated:', response);
                this.getRecentData();
                this.snackbar.success("Exchange name updated", 4000);
                console.log("ExchangeNAME=============name=>", this.upExchangeForm.get('name').value);
                this.upExchangeForm.get('name').setValue("");
                console.log("ExchangeNAME2==============>", this.upExchangeForm.get('name').value);
            },
            (error) => {
                // Handle the error
                console.error('Error updating exchange:', error);
                this.snackbar.error("Error updating exchange name", 4000);
            }
        );
    }
}
