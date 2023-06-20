import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    NgForm,
    Validators,
    FormControl,
    ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    currentStep: number = 1;
    otpForm: FormGroup;
    setPasswordForm: FormGroup;
    tokens: any;
    phoneNumber: any;
    errorMessage: string = '';
    // errorMessage1 : string;

    countdown: number = 45; // Initial countdown value
    interval: any;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private snackbar: SnackbarServiceService
    ) {
        this.setPasswordForm = this._formBuilder.group({
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });

        this.otpForm = this._formBuilder.group({
            otp1: [''],
            otp2: [''],
            otp3: [''],
            otp4: [''],
        });
    }

    get password() {
        return this.setPasswordForm.get('password');
    }
    get confirmPassword() {
        return this.setPasswordForm.get('confirmPassword');
    }

    // handleOTPInput(event: any, nextInput: ElementRef | null) {
    //     if (event.target.value.length === 1 && nextInput) {
    //         nextInput.nativeElement.focus();
    //     }
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
            number: new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{10}'),
            ]),
        });
    }
    get username() {
        return this.signUpForm.get('username');
    }
    get number() {
        return this.signUpForm.get('number');
    }

    // ngOnDestroy() {
    //     clearInterval(this.interval);
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        if (this.signUpForm.invalid) {
            console.log(this.signUpForm);
            console.log(this.signUpForm.controls.username.status);

            if (this.signUpForm.invalid) {
                    // this.errorMessage = '';
            }
            return;
        }
        console.log(this.signUpForm.value);

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.currentStep++;
                    this.phoneNumber = this.signUpForm.value.number;
                    // this.snackbar.success(response.message, 3000);
                    this.errorMessage = response.message;

                    this.startCountdown();
                }
                console.log(response);
            },
            (error) => {
                console.log(error);
                this.signUpForm.enable();
                this.errorMessage = error.error.message;
            }
        );
    }

    checkOTP(): void {
        const { otp1, otp2, otp3, otp4 } = this.otpForm.value;
        const enteredOTP = otp1 + otp2 + otp3 + otp4;

        if (this.otpForm.invalid) {
            return;
        }
        let OTPValidation = {
            otp: enteredOTP,
            number: this.signUpForm.value.number,
        };
        this._authService.submitOTP(OTPValidation).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.currentStep++;
                    // this.snackbar.success(response.message, 3000);
                    this.errorMessage = response.message;
                }
                console.log(response);
            },
            (error) => {
                // this.snackbar.error(error.error.message, 4000);
                this.errorMessage = error.error.message;
            }
        );
    }

    _setpassword(): void {
        console.log(this.setPasswordForm);

        this.tokens = localStorage.getItem('accessToken');
        if (this.setPasswordForm.controls.password.status === 'INVALID') {
            // this.snackbar.error('Minimum 6 characters in password', 4000);
            this.errorMessage = 'Minimum 6 character in password';
            return;
        }
        if (
            this.setPasswordForm.value.password !==
            this.setPasswordForm.value.confirmPassword
        ) {
            // this.snackbar.error(`Passwords don't match`, 4000);
            this.errorMessage = "Password don't match";
            return;
        }
        let validation = {
            token: this.tokens,
            password: this.setPasswordForm.value.password,
        };
        this._authService.resetPassword(validation).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.currentStep++;
                }
                // this.snackbar.success(response.message, 3000);
                this._router.navigate(['/home']);
            },
            (error) => {
                // this.snackbar.error(error.error.message, 4000);
                this.errorMessage = error.error.message;
            }
        );
    }

    startCountdown(): void {
        this.countdown = 45;
        this.interval = setInterval(() => {
            this.countdown--;
            console.log(this.countdown);
            if (this.countdown === 0) {
                clearInterval(this.interval);
            }
        }, 45000);
    }

    resetCountdown(): void {
        clearInterval(this.interval);
        this.countdown = 45;
    }
}
