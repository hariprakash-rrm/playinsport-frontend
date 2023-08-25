import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  apiUrl:any=environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }

  claimCoupom(data:any): Observable<any>{
    return this._httpClient.post(`${this.apiUrl}/coupon/claim`, data)
    .pipe(
      switchMap((res: any) => {
        return of(res);
      })
    );
 }
}
