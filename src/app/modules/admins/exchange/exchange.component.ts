import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { environment } from 'environments/environment';
import { ExchangeService } from './services/exchange.service';

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html',
    styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
    myForm: FormGroup;
    editForm: FormGroup;
    initForm: FormGroup;
    searchInput = 1;
    activeTab = '1'; // Default to the "Create" tab
    showPopup = false;
    currentData: any;
    finalizeTeam: any;
    exchanges: any;
    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private toastr: SnackbarServiceService,
        private exchangeService: ExchangeService
    ) {
        this.myForm = this.fb.group({
            id: ['', [Validators.required]],
            types: ['', [Validators.required]],
            mode: ['', [Validators.required]],
            team1: ['', [Validators.required]],
            team2: ['', [Validators.required]],
            odds1: [0, [Validators.required, Validators.min(0)]],
            odds2: [0, [Validators.required, Validators.min(0)]],
            startTime: new FormControl(null, [Validators.required]),
            endTime: new FormControl(null, [Validators.required]),
        });
        this.initForm = this.fb.group({
            name: ['', [Validators.required]],
        });
        this.editForm = this.fb.group({
            types: ['', [Validators.required]],
            mode: ['', [Validators.required]],
            team1: ['', [Validators.required]],
            team2: ['', [Validators.required]],
            odds1: [0, [Validators.required, Validators.min(0)]],
            odds2: [0, [Validators.required, Validators.min(0)]],
            startTime: new FormControl(null, [Validators.required]),
            endTime: new FormControl(null, [Validators.required]),
            isFinalized: new FormControl(null, [Validators.required]),
            message: new FormControl(''),
        });
    }

    ngOnInit(): void {}

    // Define a function to convert Unix timestamps to datetime-local format
    convertUnixToDatetimeLocal(unixTimestamp: number): string {
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
        return date.toISOString().slice(0, 16); // Convert to datetime-local format (YYYY-MM-DDTHH:mm)
    }

    openPopup() {
        this.showPopup = true;
    }

    closePopup() {
        this.showPopup = false;
    }

    submit() {
        // Handle the submit logic here
        // You can access the selected payment method from the dropdown
        this.closePopup();
    }

    onSubmit() {
        if (this.myForm.valid) {
            const formData = this.myForm.value;
            formData.startTime = new Date(formData.startTime).getTime();
            formData.endTime = new Date(formData.endTime).getTime();

            this.http
                .post(`${environment.apiUrl}/exchange/create`, formData)
                .subscribe(
                    (response) => {
                        // Handle a successful response from the server
                        console.log('Form data sent successfully:', response);
                        this.toastr.success('Gmae created', 3000);
                    },
                    (error) => {
                        // Handle errors if the HTTP request fails
                        console.error('Error sending form data:', error);
                        this.toastr.error(error.error.message, 3000);
                    }
                );
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

    onInitial() {
        this.createInitialMatch(this.initForm.get('name').value);
    }

    // Define a function to update an exchange
    updateExchange(id: string, updateExchangeDto: any) {
        const editFormValues = {
            id: id,
            types: this.editForm.get('types').value,
            mode: this.editForm.get('mode').value,
            team1: this.editForm.get('team1').value,
            team2: this.editForm.get('team2').value,
            odds1: this.editForm.get('odds1').value,
            odds2: this.editForm.get('odds2').value,
            startTime: new Date(this.editForm.get('startTime').value).getTime(),
            endTime: new Date(this.editForm.get('endTime').value).getTime(),
            isFinalized: Boolean(this.editForm.get('isFinalized').value),
            message: this.editForm.get('message').value,
        };
        console.log(editFormValues);
        this.exchangeService.updateExchange(id, editFormValues).subscribe(
            (response) => {
                console.log('Exchange updated successfully:', response);
                this.toastr.success('Game updated', 3000);
                // Handle success (e.g., show a success message)
            },
            (error) => {
                console.error('Error updating exchange:', error);
                // Handle error (e.g., show an error message)
                this.toastr.error(error.error.message, 3000);
            }
        );
    }

    createInitialMatch(name: string): void {
        this.exchangeService.initialMatch(name).subscribe(
            (response) => {
                console.log('Initial match created:', response);
                // Handle the response as needed
            },
            (error) => {
                console.error('Error creating initial match:', error);
                // Handle errors
            }
        );
    }

    finalize(id: number, team: string) {
        console.log(id, team);
        this.exchangeService.finalizeExchange(id, team).subscribe(
            (response) => {
                // Handle the successful response here
                console.log('Exchange finalized:', response);
            },
            (error) => {
                // Handle errors here
                console.error('Error finalizing exchange:', error);
            }
        );
    }

    refund(id: number) {
        this.exchangeService.refundExchange(id).subscribe(
            (response) => {
                // Handle the successful response here
                console.log('Exchange refunded:', response);
            },
            (error) => {
                // Handle errors here
                console.error('Error refunding exchange:', error);
            }
        );
    }

    // Define a function to get an exchange by its ID
    getExchangeById(id: number) {
        this.exchangeService.findById(id).subscribe(
            (exchange) => {
                console.log('Exchange found:', exchange);
                console.log(exchange);
                // Handle the retrieved exchange (e.g., display it in the UI)

                this.editForm.patchValue(exchange);
                this.currentData = exchange;
            },
            (error) => {
                console.error('Error finding exchange:', error);
                this.toastr.error(error.error.message, 3000);
                // Handle error (e.g., show an error message)
            }
        );
    }

    placeDetails(term: any) {
        console.log(term);
    }
}
