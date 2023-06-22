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

    phoneNumber: any;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

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
    }

    get number() {
        return this.signInForm.get('number');
    }
    get password() {
        return this.signInForm.get('password');
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

    goToResetPassword() {
        this._router.navigate(['/reset-password']);
    }
}
