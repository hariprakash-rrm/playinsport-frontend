import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { ExchangeService } from './services/exchange.service';

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html',
    styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
    exchangeForm: FormGroup;
    upExchangeForm: FormGroup;
    exchangeId: number | null = null;
    errorMessage: any;
    exchange: any;
    constructor(
        private formBuilder: FormBuilder,
        private exchangeService: ExchangeService
    ) {
        this.exchangeForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
        this.upExchangeForm = this.formBuilder.group({
          id: ['', [Validators.required, Validators.minLength(1)]],
          name: ['', [Validators.required, Validators.minLength(1)]],
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

        this.exchangeService.getMatchById(id).subscribe(
            (exchange) => {
                this.exchange = exchange; // Set the retrieved exchange data
                this.upExchangeForm.patchValue({
                    name: exchange.name,
                });
            },
            (error) => {
                console.error('Error fetching exchange:', error);
            }
        );
    }

    update() {
        if (this.exchangeForm.invalid) {
            return;
        }

        const id = this.exchangeForm.get('id').value;
        const name = this.exchangeForm.get('name').value;

        // If there's an existing exchange, update it
        this.exchangeService.updateExchange(id, name).subscribe(
            (response) => {
                // Handle the success response
                console.log('Exchange updated:', response);
            },
            (error) => {
                // Handle the error
                console.error('Error updating exchange:', error);
            }
        );
    }
}
