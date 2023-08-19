import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private apiUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set user(user: string) {
        localStorage.setItem('user', user);
    }

    get user(): string {
        return localStorage.getItem('user') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param number
     */
    forgotPassword(data:any): Observable<any> {
        return this._httpClient.post(
            `${environment.apiUrl}/send-otp`,
            data
        );
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(validation: {
        token: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/set-password`, validation);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { number: number; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post(`${this.apiUrl}/signin`, credentials).pipe(
            switchMap((response: any) => {
                // console.log(response);
                // Store the access token in the local storage
                this.accessToken = response.token;
                this.user = JSON.stringify(response.data);
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;
                // console.log(response);

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    submitOTP(OTPValidation: { otp: number; number: Number }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient
            .post(`${this.apiUrl}/submit-otp`, OTPValidation)
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;
                    this.user = JSON.stringify(response.data);
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return of(true);
        return this._httpClient
            .post('api/auth/refresh-access-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.accessToken;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { username: string; number: number; referredBy: string }): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/signup`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        number: Number;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/login`, credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is already authenticated
       

        // Check the access token availability
        if (this.accessToken == null || this.accessToken == 'undefined' || this.accessToken=='' || this.user=='undefined'||this.user==''||this.user==null) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        if (this._authenticated) {
            return of(true);
        }

        // If the access token exists and it hasn't expired, sign in using it
        return this.signInUsingToken();
    }
}
