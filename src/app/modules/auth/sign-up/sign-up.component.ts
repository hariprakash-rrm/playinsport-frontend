import { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit,OnDestroy {
    @ViewChild('otp1Input') otpInput1!: ElementRef;
    @ViewChild('otp2Input') otpInput2!: ElementRef;
    @ViewChild('otp3Input') otpInput3!: ElementRef;
    @ViewChild('otp4Input') otpInput4!: ElementRef;
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
    phoneNumber: number;
    errorMessage: string = '';
    numberError: string = '';
    refCode: string | '';

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
        private snackbar: SnackbarServiceService,
        private route: ActivatedRoute
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
                Validators.pattern(/^[^\s]*$/)
            ]),
            number: new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]{10}'),
            ]),
        });

        this.route.queryParams.subscribe(params => {
        this.refCode = params['ref'];
          });

          console.log(this.refCode);
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
        this.errorMessage ='';

        if (this.signUpForm.invalid) {

            if (this.signUpForm.invalid) {
                if (
                    !this.signUpForm.value.username ||
                    !this.signUpForm.value.number
                ) {
                    this.numberError =
                        'User name or phone number cannot be empty';
                } else {
                    this.numberError = '';
                }
                return;
            }
            return;
        }

        // Hide the alert
        this.showAlert = false;

        // Sign up

        console.log(this.refCode);
        let data = {
            username: this.signUpForm.value.username,
            number: this.signUpForm.value.number,
            referredBy: this.refCode 
        }
        this._authService.signUp(data).subscribe(
            (response) => {
                console.log(this.signUpForm.value);
                if (response.statusCode === 201) {
                    this.errorMessage = '';
                    this.currentStep++;
                    this.phoneNumber = this.signUpForm.value.number;
                    this.startCountdown();
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

    clearOtpFields() {
        console.log(this.otpForm.value.otp1);
        this.otpForm.value.otp1 = '';
        this.otpForm.value.otp2 = '';
        this.otpForm.value.otp3 = '';
        this.otpForm.value.otp4 = '';

      }

     noSpacesValidator(control: FormControl): { [key: string]: boolean } | null {
        const value = control.value;
        if (value && value.indexOf(' ') >= 0) {
          return { 'noSpaces': true };
        }
        return null;
      }

    checkOTP(): void {
        this.errorMessage ='';

        const { otp1, otp2, otp3, otp4 } = this.otpForm.value;
        const enteredOTP = otp1 + otp2 + otp3 + otp4;
        this.errorMessage = '';

        if (this.otpForm.invalid) {
            this.clearOtpFields();
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
                    this.errorMessage = '';
                }
                // console.log(response);
            },
            (error) => {
                console.log("NOTVALID");
                this.clearOtpFields();
                this.errorMessage = error.error.message;
            }
        );
    }

    _setpassword(): void {
        this.errorMessage ='';


        this.tokens = localStorage.getItem('accessToken');
        if (this.setPasswordForm.controls.password.status === 'INVALID') {
            return;
        }
        if (
            this.setPasswordForm.value.password !==
            this.setPasswordForm.value.confirmPassword
        ) {
            this.errorMessage = "Confirm password doesn't match password";
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
                    this.snackbar.success('Password updated', 4000);
                }
                this._router.navigate(['/home']);
            },
            (error) => {
                this.errorMessage = error.error.message;
            }
        );
    }

    async goToLoginPage(){
        this._router.navigate(['/sign-in']);
    }

    startCountdown(): void {
        this.errorMessage ='';

        // this.countdown = 10;
        this.interval = setInterval(() => {
            this.countdown--;
            // console.log(this.countdown);
            if (this.countdown === 0) {
                clearInterval(this.interval);
            }
        }, 1000); // Changed interval to 1000 milliseconds (1 second)
    }

    resetCountdown(): void {
        this.errorMessage ='';

        clearInterval(this.interval);
        this.countdown = 10;
    }

    onInputChange(event: any, nextInput: number) {
        this.errorMessage ='';

        const input = event.target as HTMLInputElement;
        if (input.value.length >= input.maxLength) {
            // Move focus to the next input field
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
    }

    resendotp() {

        this.errorMessage ='';

        if (this.countdown !== 0) {
            this.errorMessage =
                'Please wait for 45 seconds before generating a new OTP.';
        }
        if (this.countdown === 0) {
            this.countdown = 45;
            this.currentStep--;
            this.clearOtpFields();
        }
    }

}
