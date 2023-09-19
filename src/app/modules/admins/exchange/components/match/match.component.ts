import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeService } from '../../services/exchange.service';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
    createMatchForm: FormGroup;
    successMessage: string | null = null;
    formErrorMessage: string | null = null;
    updateMatchForm: FormGroup;
    matchDetails: any;
    constructor(
        private formBuilder: FormBuilder,
        private exchangeService: ExchangeService
    ) {
        this.createMatchForm = this.formBuilder.group({
            exchangeId: [''],
            team1: ['', [Validators.required]],
            team2: ['', [Validators.required]],
            odds1: ['', [Validators.required, Validators.min(0)]],
            odds2: ['', [Validators.required, Validators.min(0)]],
            startTime: ['', [Validators.required]],
            endTime: ['', [Validators.required]],
            message: [''],
        });
        this.updateMatchForm = this.formBuilder.group({
            exchangeId: ['', Validators.required],
            team1: ['', Validators.required],
            team2: ['', Validators.required],
            odds1: ['', Validators.required],
            odds2: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            isFinalized: [false],
            message: [''],
        });
    }

    ngOnInit(): void {}

    createMatch(): void {
        if (this.createMatchForm.valid) {
            const startTime = this.convertToTimestamp(
                this.createMatchForm.get('startTime').value
            );
            const endTime = this.convertToTimestamp(
                this.createMatchForm.get('endTime').value
            );

            const exchangeId = 1; // Replace with the desired exchange ID
            const matchData = this.createMatchForm.value;
            matchData.startTime = startTime;
            matchData.endTime = endTime;
            this.exchangeService.createMatch(exchangeId, matchData).subscribe(
                () => {
                    this.successMessage = 'Match created successfully';
                    this.formErrorMessage = null;
                    this.createMatchForm.reset();
                },
                (error) => {
                    this.successMessage = null;
                    this.formErrorMessage = 'Error creating match';
                }
            );
        }
    }

    convertToTimestamp(datetime: string): number {
        const parsedDate = new Date(datetime);
        return parsedDate.getTime();
    }

    searchMatchById(): void {
        const matchId = this.updateMatchForm.get('id').value;
        if (matchId) {
            // Call the service to retrieve match details by ID
            this.exchangeService.getMatchById(matchId).subscribe(
                (response) => {
                    // Update the form with the retrieved match details
                    this.matchDetails = response;
                    this.updateMatchForm.patchValue(this.matchDetails.match[0]);
                },
                (error) => {
                    // Handle error, e.g., show an error message
                    console.error('Error fetching match details:', error);
                }
            );
        }
    }

    updateMatch() {
        if (this.updateMatchForm.invalid) {
            // Handle invalid form data, show error messages, etc.
            return;
        }

        const exchangeId = Number(this.updateMatchForm.get('exchangeId').value);
        const matchData = this.updateMatchForm.value; // Get all form values as an object

        this.exchangeService.updateMatch(exchangeId, matchData).subscribe(
            (response) => {
                console.log('Match updated successfully', response);
                // Optionally, reset the form after a successful update
                this.updateMatchForm.reset();
            },
            (error) => {
                console.error('Error updating match', error);
            }
        );
    }

    // Method to fetch exchange data by ID and populate the form
    fetchExchangeData(exchangeId: number) {
        this.exchangeService.getMatchById(exchangeId).subscribe(
            (exchangeData) => {
                // Populate the form with the retrieved data
                this.updateMatchForm.patchValue(exchangeData.match);
            },
            (error) => {
                console.error('Error fetching exchange data', error);
            }
        );
    }
}
