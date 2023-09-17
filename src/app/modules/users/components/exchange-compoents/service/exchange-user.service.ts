import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeUserService {

  constructor(private http:HttpClient) { }

  getLiveExchanges(): Observable<any> {
    const url = `${environment.apiUrl}/exchange/live`;
    return this.http.get(url);
  }
}
