import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }


  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }
  getDepositTransactions(data:{token:string;method:string}):Observable<any> {
    return this._httpClient
      .get(`${this.apiUrl}/user/getDepositPayment?token=${data.token}&method=${data.method}`)
      .pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
      );
  }

  getWithdrawTransaction(data:{token:string;method:string}):Observable<any>{
    return this._httpClient
    .get(`${this.apiUrl}/user/getWithdrawPayment?token=${data.token}&method=${data.method}`)
    .pipe(
      switchMap((response: any) => {
        
        return of(response);
      })
    );
  }

  updatePayment(data:any):Observable<any>{
    return this._httpClient.post(`${this.apiUrl}/user/updatePayment`,data).pipe(
      switchMap((res:any)=>{
        return of(res)
      })
    )
  }
}

