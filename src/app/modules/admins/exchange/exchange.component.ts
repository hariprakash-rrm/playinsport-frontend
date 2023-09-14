import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent  {

  myForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient,private toastr:SnackbarServiceService) {
    this.myForm = this.fb.group({
      types: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      team1: ['', [Validators.required]],
      team2: ['', [Validators.required]],
      odds1: [0, [Validators.required, Validators.min(0)]],
      odds2: [0, [Validators.required, Validators.min(0)]],
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      formData.startTime = new Date(formData.startTime).getTime();
      formData.endTime = new Date(formData.endTime).getTime();
  
      // Replace 'YOUR_API_URL' with the actual API endpoint
      const apiUrl = 'YOUR_API_URL/exchange/create';
  
      this.http.post(`${environment.apiUrl}/exchange/create`, formData).subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log('Form data sent successfully:', response);
          this.toastr.success('Gmae created',3000)
          
        },
        (error) => {
          // Handle errors if the HTTP request fails
          console.error('Error sending form data:', error);
          this.toastr.success(error.error.message,3000)
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
