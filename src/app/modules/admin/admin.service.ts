import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class AdminService {
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
     * Reset password
     *
     * @param password
     */
    resetPassword(validation: {
        token: any;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/set-password`, validation);
    }

    /**
     * getUser
     *
     * @param data
     */

    getUser( username: string, token: any ): Observable<any> {
        console.log('getUser');
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        console.log(token);
         if (!username || !token) {
             return throwError('Username and token should not be empty.');
         }

         const params = new HttpParams()
             .set('username', username)
             .set('token', token);

        return this._httpClient
            .get(`${this.apiUrl}/user/get-user`,{ params: params })
            .pipe(
                switchMap((response: any) => {
                    console.log(response);
                    // Store the access token in the local storage
                    this.accessToken = response.token;
                    this.user = JSON.stringify(response.details);
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    updateUser(): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.get(`${this.apiUrl}/update-user`).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.token;
                this.user = JSON.stringify(response.details);
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }
}
