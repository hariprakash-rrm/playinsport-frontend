import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

    getUser(username: string, token: any): Observable<any> {
        if (!username || !token) {
            return throwError('Username and token should not be empty.');
        }

        const params = new HttpParams()
            .set('username', username)
            .set('token', token);

        return this._httpClient
            .get(`${this.apiUrl}/user/get-user`, { params: params })
            .pipe(
                switchMap((response: any) => {
                    // this.user = JSON.stringify(response.details);
                    return of(response);
                })
            );
    }

    updateUser(data: {
        username: string;
        number: number;
        wallet: number;
        block: boolean;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        return this._httpClient
            .post(`${this.apiUrl}/user/update-user`, data)
            .pipe(
                switchMap((response: any) => {
                    // this.user = JSON.stringify(response.details);
                    return of(response);
                })
            );
    }
}
