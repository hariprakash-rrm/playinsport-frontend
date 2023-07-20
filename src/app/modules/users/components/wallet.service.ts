import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private _httpClient: HttpClient) { }
  apiUrl: string = environment.apiUrl;

  walletTransaction(data:{mobileNumber: number; transactionId: string; amount: number; paymentMethod: string; userPhoneNumber: number;}): Observable<any>{

    console.log(data);
    return this._httpClient.post(`${this.apiUrl}/user/walletTransaction`, data).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}
}
