import { HttpClient, HttpParams } from '@angular/common/http';
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

  findById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/exchange/get/${id}`;
    return this.http.get(url);
  }

  filterExchanges(team1: string, team2: string): Observable<any[]> {
    // Create HttpParams to add query parameters
    const params = new HttpParams()
      .set('team1', team1)
      .set('team2', team2);

    const url = `${environment.apiUrl}/exchange/filter`;

    return this.http.get<any[]>(url, { params });
  }
  updateExchangeDetails(id: number, data: any): Observable<any> {
    // Replace 'any' with the actual type of updateExchangeDto if you have a defined type for it

    const url = `${environment.apiUrl}/exchange/update-details/${id}`;

    // You can also include any authentication headers here if required

    return this.http.post(url, data);
  }

  findExchangesByNumber(usernumber: number): Observable<any[]> {
    const url = `${environment.apiUrl}/exchange/by-number/${usernumber}`;
    return this.http.get<any[]>(url);
  }
}
