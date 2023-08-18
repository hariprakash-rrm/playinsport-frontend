import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ViewEncapsulation,
    OnDestroy,
} from '@angular/core';
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
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit, OnDestroy {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    @ViewChild('otp1Input') otpInput1!: ElementRef;
    @ViewChild('otp2Input') otpInput2!: ElementRef;
    @ViewChild('otp3Input') otpInput3!: ElementRef;
    @ViewChild('otp4Input') otpInput4!: ElementRef;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    errorMessage: string = '';
    numberError: string = '';
    currentStep: number = 1;
    numberForm: FormGroup;
    countdown: number = 45;
    interval: any;
    otpForm: FormGroup;
    tokens: any;
    setPasswordForm: FormGroup;
    isAdmin:boolean;
    isOtpSent:boolean

    phoneNumber: any;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private snackbar: SnackbarServiceService
    ) {
        this.otpForm = this._formBuilder.group({
            otp1: [''],
            otp2: [''],
            otp3: [''],
            otp4: [''],
        });

        this.setPasswordForm = this._formBuilder.group({
            passwords: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
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

    get passwords() {
        return this.setPasswordForm.get('passwords');
    }
    get confirmPassword() {
        return this.setPasswordForm.get('confirmPassword');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            if (
                !this.signInForm.value.number ||
                !this.signInForm.value.password
            ) {
                this.numberError = 'Phone number or password cannot be empty';
            }
            return;
        }

        const credentials = {
            number: +this.signInForm.value.number,
            password: this.signInForm.value.password,
        };

        // Sign in
        this._authService.signIn(credentials).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.phoneNumber = this.signInForm.value.number;
                    this.errorMessage = '';
                    console.log(response);
                }

                if (response.data.isAdmin) {
                    this._router.navigate(['/admin/home']);
                } else {
                    this._router.navigate(['/home']);
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 0) {
                    this.errorMessage = 'Error: Backend server not connected';
                } else {
                    this.errorMessage = error.error.message;
                }
            }
        );
    }

    goToSignUpForm() {
        this.errorMessage = '';

        this._router.navigate(['/sign-up']);
    }

    goToSendOtp() {
        this.errorMessage = '';

            const data = {
            number: +this.numberForm.value.numbers,
        };
       if(this.isOtpSent){
        this.errorMessage=`Please wait ${this.countdown} seconds and try again`
        return
       }
        this._authService.forgotPassword(data).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    console.log(response);
                    this.currentStep++;
                    this.phoneNumber = this.numberForm.value.numbers;
                    this.startCountdown();
                    this.errorMessage = '';
                    this.isOtpSent=true
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 0) {
                    this.errorMessage = 'Error: Backend server not connected';
                } else {
                    this.errorMessage = error.error.message;
                }
            }
        );
    }

    goToForgotPassword() {
        this.errorMessage = '';
        this.currentStep++;
    }

    goBack(){
        this.errorMessage=''
        this.currentStep--;
        this.otpForm.value.otp1='';
        this.otpForm.value.otp2='';
        this.otpForm.value.otp3='';
        this.otpForm.value.otp4='';
        this.countdown = 0;
    }

    startCountdown(): void {
        this.countdown=45
        this.errorMessage = '';

        // this.countdown = 10;
        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(this.interval);
                this.countdown = 0;
                this.isOtpSent=false
            }
            console.log(this.countdown);
        }, 1000); // Changed interval to 1000 milliseconds (1 second)
    }

    checkOTP(): void {
        this.errorMessage = '';

        const { otp1, otp2, otp3, otp4 } = this.otpForm.value;
        const enteredOTP = otp1 + otp2 + otp3 + otp4;
        console.log(enteredOTP);

        if (this.otpForm.invalid) {
            return;
        }
        let OTPValidation = {
            otp: +enteredOTP,
            number: +this.numberForm.value.numbers,
        };
        this._authService.submitOTP(OTPValidation).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.currentStep++;
                    this.errorMessage = '';
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 0) {
                    this.errorMessage = 'Error: Backend server not connected';
                } else {
                    this.errorMessage = error.error.message;
                }
            });
    }
    resendotp() {
        this.errorMessage = '';

        if (this.countdown !== 0) {
            this.errorMessage =
                'Please wait for 45 seconds before generating a new OTP.';
        }
        if (this.countdown <= 0) {
            // console.log('GOTOSENDOTP');
            this.currentStep--;
            this.countdown = 45;
            this.goToSendOtp();

        }
    }
    _setpassword(): void {
        this.errorMessage = '';
        this.tokens = localStorage.getItem('accessToken');
        if (this.setPasswordForm.controls.passwords.status === 'INVALID') {
            return;
        }
        if (
            this.setPasswordForm.value.passwords !==
            this.setPasswordForm.value.confirmPassword
        ) {
            this.errorMessage = "Confirm password doesn't match password";
            return;
        }
        let validation = {
            token: this.tokens,
            password: this.setPasswordForm.value.passwords,
        };
        this._authService.resetPassword(validation).subscribe(
            (response) => {
                if (response.statusCode === 201) {
                    this.currentStep++;
                }
                this._router.navigate(['/home']);
            },
            (error: HttpErrorResponse) => {
                if (error.status === 0) {
                    this.errorMessage = 'Error: Backend server not connected';
                } else {
                    this.errorMessage = error.error.message;
                }
    });
}
    onInputChange(event: any, nextInput: number) {
        this.errorMessage = '';

        const input = event.target as HTMLInputElement;
        if (input.value.length >= input.maxLength) {
            switch (nextInput) {
                case 2:
                    this.otpInput2.nativeElement.focus();
                    break;
                case 3:
                    this.otpInput3.nativeElement.focus();
                    break;
                case 4:
                    this.otpInput4.nativeElement.focus();
                    break;
                // Add more cases for additional input fields
            }
        }
    }
    ngOnDestroy(): void {
        clearInterval(this.interval);
        this.countdown = 0;
    }

}
