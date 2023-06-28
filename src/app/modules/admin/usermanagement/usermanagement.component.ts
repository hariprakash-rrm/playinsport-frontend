import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-usermanagement',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.css'],
})
export class UsermanagementComponent {
    private apiUrl = environment.apiUrl;

    // signIn(): void {
    //     // console.log(!this..value.number);
    //     // console.log(!this.signInForm.value.number);

    //     // Return if the form is invalid

    //     if (this.signInForm.invalid) {
    //         if (
    //             !this.signInForm.value.number ||
    //             !this.signInForm.value.password
    //         ) {
    //             this.numberError = 'Phone number or password cannot be empty';
    //         }
    //         return;
    //     }

    //     let credentials = {
    //         number: this.signInForm.value.number,
    //         password: this.signInForm.value.password,
    //     };

    //     // Sign in
    //     this._authService.signIn(credentials).subscribe(
    //         (response) => {
    //             if (response.statusCode === 201) {
    //                 this.phoneNumber = this.signInForm.value.number;
    //                 this.errorMessage = '';
    //             }
    //             if (this.isAdmin) {
    //                 this._router.navigate(['/admin/home']);
    //             } else {
    //                 this._router.navigate(['/home']);
    //             }
    //         },
    //         (error) => {
    //             this.signInForm.enable();
    //             this.errorMessage = error.error.message;
    //         }
    //     );
    // }
}
