import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotTokenService {
  private apiUrl = environment.apiUrl
  constructor(private _httpClient: HttpClient) { }

  getGames(dates:any): Observable<any>{
    const params = new HttpParams()
        .set('dates', dates)
       
    return this._httpClient.get(`${this.apiUrl}/token/games`, { params: params }).pipe(
        switchMap((response: any) => {
            // this.user = JSON.stringify(response.details);
            return of(response);
        })
    );
}
}
