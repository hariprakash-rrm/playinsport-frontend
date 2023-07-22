import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
@Injectable()
export class TokenService {
    private _authenticated: boolean = false;
    private apiUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) { }

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
     * getUser
     *
     * @param data
     */

    createToken(data: {
        name: string;
        totalTokenNumber: number;
        maximumTokenPerUser: number;
        date: any;
        tokenPrice: number;
        prize: any[];
        token: string;
        youtubeLink: string;
        facebookLink: string
    }): Observable<any> {
        console.log(data);
        return this._httpClient.post(`${this.apiUrl}/token/create`, data).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    updateRound(data: any): Observable<any> {

        return this._httpClient.post(`${this.apiUrl}/token/update`, data).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getRound(round: any): Observable<any> {
        const params = new HttpParams()
            .set('data', round)

        return this._httpClient.get(`${this.apiUrl}/token/get`, { params: params }).pipe(
            switchMap((response: any) => {
                console.log(response);
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
        return this._httpClient
            .post(`${this.apiUrl}/user/update-user`, data)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    liveUpdate(data: {
        round: any;
        action: any;
        token: string;
        youtubeLink: string;
        youtubeLiveLink: string;
        facebookLink: string;
        facebookLiveLink: string;
    }) {
        console.log(data);
        return this._httpClient
            .post(`${this.apiUrl}/token/update`, data)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            )
    }
}
