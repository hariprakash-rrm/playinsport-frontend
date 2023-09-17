import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExchangeService {
    constructor(private http: HttpClient) {}

    updateExchange(id: string, updateExchangeDto: any): Observable<any> {
        const url = `${environment.apiUrl}/exchange/${id}`;
        return this.http.put(url, updateExchangeDto);
    }

    findById(id: number): Observable<any> {
        const url = `${environment.apiUrl}/exchange/get/${id}`;
        return this.http.get(url);
    }

    finalizeExchange(id: number, team: string) {
      const url = `${environment.apiUrl}/exchange/finalize/${id}/${team}`;
      
      // Send an HTTP PUT request to the API endpoint
      return this.http.put(url, {});
    }

    refundExchange(id: number) {
      const url = `${environment.apiUrl}/exchange/refund/${id}`;
      
      // Send an HTTP PUT request to the API endpoint
      return this.http.put(url, {});
    }

   
  
}
