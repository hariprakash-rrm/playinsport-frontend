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

  deposit(data:any): Observable<any>{

    console.log(data);
    return this._httpClient.post(`${this.apiUrl}/user/deposit`, data).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

  getTxn(data:any): Observable<any>{
    return this._httpClient.get(`${this.apiUrl}/user/getUserWalletTxn?token=${data.token}&userPhoneNumber=${data.userPhoneNumber}`)
    .pipe(
      switchMap((res: any) => {
        return of(res);
      })
    );
  
 }
}
