import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExchangeService {
    constructor(private http: HttpClient) {}

    createExchange(name: string): Observable<any> {
        const exchangeData = { name };
        return this.http.post(`${environment.apiUrl}/exchange`, exchangeData);
    }

    // findExchangeById(id: number): Observable<any> {
    //     return this.http.get(`${environment.apiUrl}/exchange/${id}`);
    // }

    createMatch(exchangeId: number, matchData: any): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}/exchange/${exchangeId}/match`,
            matchData
        );
    }
    updateMatch(exchangeId: number, matchData: any): Observable<any> {
      const url = `${environment.apiUrl}/exchange/match/${exchangeId}`;
      return this.http.put(url, matchData);
    }

    getMatchById(matchId: number): Observable<any> {
      const url = `${environment.apiUrl}/exchange/${matchId}`; // Adjust the URL as per your API endpoint
  
      // Make the HTTP GET request to fetch match details by ID
      return this.http.get(url)
      
    }

    updateExchange(id: number, name: string): Observable<any> {
        const url = `${environment.apiUrl}/exchange/${id}`;
        return this.http.put(url, { name });
      }

      getRecent20Data(): Observable<any[]> {
        const apiUrl =`${environment.apiUrl}/exchange/recent` 
        return this.http.get<any[]>(apiUrl);
      }
}
