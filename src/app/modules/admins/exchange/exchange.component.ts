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
export class ExchangeComponent {
    exchangeForm: FormGroup;
    exchangeId: number | null = null;
    errorMessage: string | null = null;
    createMatchForm: FormGroup;
    successMessage: string | null = null;
    formErrorMessage: string | null = null;
    updateMatchForm: FormGroup;
    matchDetails:any


    constructor(
        private formBuilder: FormBuilder,
        private exchangeService: ExchangeService
    ) {
        this.exchangeForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
        this.createMatchForm = this.formBuilder.group({
            exchangeId:[''],
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
    convertToTimestamp(datetime: string): number {
        const parsedDate = new Date(datetime);
        return parsedDate.getTime();
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
            matchData.startTime = startTime
            matchData.endTime=endTime
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
}
