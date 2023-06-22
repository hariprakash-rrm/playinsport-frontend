import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    NgForm,
    Validators,
    FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    errorMessage: string = '';
    numberError: string = '';
    currentStep: number = 2;
    numberForm: FormGroup;
    countdown: number = 45;
    interval: any;

    phoneNumber: any;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            number: new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{10}'),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
        this.numberForm = this._formBuilder.group({
            numbers: new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{10}'),
            ]),
        });
    }

    get number() {
        return this.signInForm.get('number');
    }
    get password() {
        return this.signInForm.get('password');
    }

    get numbers() {
        return this.numberForm.get('numbers');
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        console.log(!this.signInForm.value.number === true);

        // Return if the form is invalid
        if (this.signInForm.invalid) {
            this.numberError = 'Phone number or password cannot be empty';
            return;
        }

        let credentials = {
            number: this.signInForm.value.number,
            password: this.signInForm.value.password,
        };

        // Sign in
        this._authService.signIn(credentials).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.phoneNumber = this.signInForm.value.number;
                    this.errorMessage = '';
                }
                this._router.navigate(['/home']);
            },
            (error) => {
                console.log(error.error.message);
                this.signInForm.enable();
                this.errorMessage = error.error.message;
            }
        );
    }

    goToSignUpForm() {
        this._router.navigate(['/sign-up']);
    }

    goToSendOtp() {
        if (this.numberForm.invalid) {
            if (this.numberForm.invalid) {
                if (!this.numberForm.value.numbers) {
                    this.numberError = 'Phone number cannot be empty';
                } else {
                    this.numberError = '';
                }
                return;
            }
            return;
        }
        // Disable the form
        this.numberForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.forgotPassword(this.numberForm.value).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.currentStep++;
                    this.phoneNumber = this.numberForm.value.numbers;
                    this.startCountdown();
                }
                console.log(response);
            },
            (error) => {
                console.log(error);
                this.numberForm.enable();
                this.errorMessage = error.error.message;
            }
        );
    }
    goToResetPassword() {}

    startCountdown(): void {
        // this.countdown = 10;
        this.interval = setInterval(() => {
            this.countdown--;
            console.log(this.countdown);
            if (this.countdown === 0) {
                clearInterval(this.interval);
            }
        }, 1000); // Changed interval to 1000 milliseconds (1 second)
    }
}
