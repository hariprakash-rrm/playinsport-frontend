import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Accordion } from 'flowbite';
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
    getAllUsers(): Observable<any> {
        return this._httpClient.get(`${this.apiUrl}/user/all-user`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            )
    }

    getAllUsersForPage(data: any): Observable<any> {
        const params = new HttpParams()
            .set('currentPage', data.currentPage)
            .set('selectedItemsPerPage', data.selectedItemsPerPage);
        return this._httpClient.get(`${this.apiUrl}/user/all-user-for-page`, { params })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            )
    }

    exportToExcel(data: {
        token: string
    }): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `${data.token}`);

        return this._httpClient.get(`${this.apiUrl}/user/export`, {
            headers: headers,
            responseType: 'blob'
        }).
            pipe(
                switchMap((response: any) => {
                    // console.log(response);
                    return of(response);
                })
            )
    }

    viewTotalSupply(data: { token: string }): Observable<any> {
        const params = new HttpParams()
            .set('token', data.token);
        return this._httpClient.get(`${this.apiUrl}/user/totalSupply`, { params: params }).
            pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            )
    }

    getQr(accessToken: any) {
        // console.log(accessToken)
        let data = {
            token: accessToken
        }
        return this._httpClient.post(`${this.apiUrl}/qr`, data).pipe(switchMap((res: any) => {
            // console.log((res))
            return of((res.data))
        }))
    }

    /**
     * 
     * @param data coupon: this.createCouponDto.coupon,
      value: this.createCouponDto.value,
      validFor: this.createCouponDto.validFor,
      validFrom: this.createCouponDto.validFrom,
      validUpto: this.createCouponDto.validUpto,
      token: accessToken
     * @returns 
     */
    createCoupon(data: { code: string; value: string; validFor: any; validFrom: string; validUpto: string; token: string; }): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/coupon/create`, data)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            )
    }
}
