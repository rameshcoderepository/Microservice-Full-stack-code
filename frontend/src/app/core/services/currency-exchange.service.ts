import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_GATEWAY_URL = environment.apiGatewayUrl;

@Injectable({
    providedIn: 'root'
})
export class CurrencyExchangeService {
    private apiUrl = `${API_GATEWAY_URL}/currency-exchange`;

    constructor(private http: HttpClient) { }

    getExchangeRate(from: string, to: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/from/${from}/to/${to}`);
    }

    getAllExchangeRates(): Observable<any> {
        return this.http.get(`${this.apiUrl}/rates`);
    }
}
